function signup() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;

    // Display alert
    alert("Welcome to SHA - CONVEYANCE, " + " " + firstName);

    // Redirect to home page
    window.location.href = "Home.html";
}
$('.form').find('input, textarea').on('keyup blur focus', function (e) {

var $this = $(this),
label = $this.prev('label');

if (e.type === 'keyup') {
      if ($this.val() === '') {
    label.removeClass('active highlight');
  } else {
    label.addClass('active highlight');
  }
} else if (e.type === 'blur') {
  if( $this.val() === '' ) {
      label.removeClass('active highlight'); 
      } else {
      label.removeClass('highlight');   
      }   
} else if (e.type === 'focus') {

if( $this.val() === '' ) {
      label.removeClass('highlight'); 
      } 
else if( $this.val() !== '' ) {
      label.addClass('highlight');
      }
}

});

$('.tab a').on('click', function (e) {

e.preventDefault();

$(this).parent().addClass('active');
$(this).parent().siblings().removeClass('active');

target = $(this).attr('href');

$('.tab-content > div').not(target).hide();

$(target).fadeIn(600);
// Get the form element
const form = document.querySelector('.form');

// Get the submit button
const submitButton = document.querySelector('.submit');

// Handle form submission
submitButton.addEventListener('click', (event) => {
event.preventDefault(); // Prevent default form submission

// Get the username and password values
const username = document.querySelector('.input[placeholder="username"]').value;
const password = document.querySelector('.input[placeholder="password"]').value;

// Perform validation or other actions here (e.g., send data to server)

// Example: Basic validation
if (username === '' || password === '') {
alert('Please fill in all fields.');
return;
}

// Example: Log the values to the console
console.log('Username:', username);
console.log('Password:', password);

// ... Your sign-up logic here ...

// Optionally, redirect to a success page or display a message
// window.location.href = 'success.html';
});
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
container.classList.remove("right-panel-active");
});            


});
class VotingApp {
  constructor(ctx, data) {
      this.ctx = ctx;
      this.votes = {};
      this.userVote = null; // Track the user's vote

      // Options from JSON
      this.options = data.map(item => item.option);  
      this.colors = data.map(item => item.color);    

      // Pre requisite methods
      this.initializeForm();
      this.updateChart();
      this.updateUserActions(); // Update action buttons visibility

      this.initializeActionButtons();
  }

  initializeActionButtons() {
      // Add event listener for the "Edit Vote" button
      document.getElementById('editVote').addEventListener('click', () => {
          this.handleEditVote();
      });
  
      // Add event listener for the "Remove Vote" button
      document.getElementById('removeVote').addEventListener('click', () => {
          this.handleRemoveVote();
      });
  
      // Add event listener for the "Done" button
      document.getElementById('doneVote').addEventListener('click', () => {
          this.handleDone();
      });
  }
  
  initializeForm() {
      document.getElementById('voteForm').addEventListener('submit', (event) => {
          this.handleVote(event);
      });

      const voteOption = document.getElementById('voteOption');
      this.options.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option;
          optionElement.textContent = option;
          voteOption.appendChild(optionElement);
      });
  }

  handleVote(event) {
      event.preventDefault();
      const voteInput = document.getElementById('voteOption');
      const selectedOption = voteInput.value;

      if (selectedOption) {
          if (this.userVote) {
              this.votes[this.userVote]--; // Decrement the previous vote
          }
          this.userVote = selectedOption; // Update user's current vote
          this.votes[selectedOption] = (this.votes[selectedOption] || 0) + 1;
          this.updateChart();
          this.showToast('Vote cast successfully!');
          voteInput.value = ''; 

          // Close the modal
          const modal = bootstrap.Modal.getInstance(document.getElementById('voteModal'));
          modal.hide();
          this.updateUserActions();
      }
  }

  handleEditVote() {
      if (this.userVote) {
          const voteOption = document.getElementById('voteOption');
          voteOption.value = this.userVote; // Pre-select the user's current vote
          const modal = new bootstrap.Modal(document.getElementById('voteModal'));
          modal.show();
      }
  }

  handleRemoveVote() {
      if (this.userVote) {
          this.votes[this.userVote]--; // Decrement the vote count
          if (this.votes[this.userVote] === 0) {
              delete this.votes[this.userVote]; // Remove option if no votes
          }
          this.userVote = null; // Clear user's vote
          this.updateChart();
          this.showToast('Your vote has been removed.');
          this.updateUserActions();
      }
  }

  handleDone() {
      this.showToast('Thank you! Your voting session is complete.');
      this.disableVoting(); // Disable further voting actions
  }

  disableVoting() {
      document.getElementById('voteForm').querySelector('button[type="submit"]').disabled = true;
      document.getElementById('editVote').disabled = true;
      document.getElementById('removeVote').disabled = true;
      document.getElementById('doneVote').disabled = true;
  }

  showToast(message) {
      const toastEl = document.getElementById('voteToast');
      const toastBody = toastEl.querySelector('.toast-body');
      toastBody.textContent = message;
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
  }

  updateChart() {
      const labels = this.options;
      const data = labels.map(option => this.votes[option] || 0);

      if (this.chart) {
          this.chart.data.datasets[0].data = data;
          this.chart.update();
      } else {
          this.chart = new Chart(this.ctx, {
              type: 'pie',
              data: {
                  labels: labels,
                  datasets: [{
                      label: 'Votes',
                      data: data,
                      backgroundColor: this.colors,
                  }]
              },
              options: {
                  responsive: true,
              }
          });
      }
  }

  updateUserActions() {
      const editButton = document.getElementById('editVote');
      const removeButton = document.getElementById('removeVote');
      const doneButton = document.getElementById('doneVote');

      const hasVote = !!this.userVote; // Check if the user has voted
      editButton.disabled = !hasVote;
      removeButton.disabled = !hasVote;
      doneButton.disabled = !hasVote;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('myChart').getContext('2d');
  fetch('json/app.json')  // Ensure this path is correct and the file exists
      .then(response => response.json())
      .then(data => {
          const app = new VotingApp(ctx, data);
      })
      .catch(error => {
          console.error('Error fetching options:', error);
      });
});
