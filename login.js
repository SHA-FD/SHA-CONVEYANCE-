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
 // Initialize mood counts
 const moodCounts = {
  Satisfied: 0,
  NotSatisfied: 0,
  NeedImprovement: 0,
  Goods: 0,
  Disappointed: 0,
};

// Initialize chart
const ctx = document.getElementById('moodChart').getContext('2d');
const moodLabels = Object.keys(moodCounts);
const moodColors = [
  '#4caf50', '#4359b9', '#9c27b0', '#8BC34A', '#2811669f',
  '#9E9E9E', '#B71C1C', '#795548', '#FFEB3B'
];

let moodChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: moodLabels,
    datasets: [{
      label: 'Mood Count',
      data: Object.values(moodCounts),
      backgroundColor: moodColors,
      borderColor: moodColors,
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Event listener to save mood
document.getElementById('saveMood').addEventListener('click', function () {
  const moodSelector = document.getElementById('moodSelector');
  const mood = moodSelector.value;
  const feedbackMessage = document.getElementById('feedbackMessage');

  // Data validation: Check if a valid mood is selected
  if (!mood || mood === "" || moodSelector.selectedIndex === 0) {
    alert("Please select a valid mood before saving.");
    return;
  }

  const date = new Date();
  const dateTime = date.toLocaleString(); // Captures current date and time

  // Construct the mood entry
  const moodEntry = { mood, dateTime };

  // Fetch existing mood log from localStorage, or initialize an empty array if none exists
  let moodLog = JSON.parse(localStorage.getItem('moodLog')) || [];

  // Add the new mood entry to the mood log
  moodLog.push(moodEntry);

  // Save the updated mood log to localStorage
  localStorage.setItem('moodLog', JSON.stringify(moodLog));

  // Update mood count for chart
  moodCounts[mood]++;
  moodChart.data.datasets[0].data = Object.values(moodCounts);
  moodChart.update(); // Update the chart

  // Provide feedback and display the updated mood log
  feedbackMessage.innerHTML = `Mood "${mood}" saved successfully at ${dateTime}`;
  feedbackMessage.style.display = 'block';
  setTimeout(() => { feedbackMessage.style.display = 'none'; }, 3000);

  // Refresh the mood log display
  displayMoodLog();
});

// Display mood log
function displayMoodLog() {
  let moodLog = JSON.parse(localStorage.getItem('moodLog')) || [];
  const moodLogContainer = document.getElementById('moodLog');
  moodLogContainer.innerHTML = ''; // Clear existing entries

  moodLog.forEach((entry, index) => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('alert', 'alert-primary', 'd-flex', 'justify-content-between', 'align-items-center', 'mood-log-entry', 'fade-enter');
    entryDiv.innerHTML = `<strong>Mood:</strong> ${entry.mood} <br> <strong>Time:</strong> ${entry.dateTime}`;

    // Delete button with custom blue styling
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.classList.add('btn', 'btn-delete', 'btn-sm');
    deleteBtn.addEventListener('click', function () { deleteMood(index); });
    entryDiv.appendChild(deleteBtn);

    moodLogContainer.appendChild(entryDiv);

    // Add fade-in effect
    setTimeout(() => entryDiv.classList.add('fade-enter-active'), 100);
  });
}

// Delete mood entry
function deleteMood(index) {
  let moodLog = JSON.parse(localStorage.getItem('moodLog')) || [];
  const deletedMood = moodLog[index].mood;
  moodLog.splice(index, 1); // Remove the mood entry at the specified index

  // Update mood count for chart
  moodCounts[deletedMood]--;
  moodChart.data.datasets[0].data = Object.values(moodCounts);
  moodChart.update(); // Update the chart

  localStorage.setItem('moodLog', JSON.stringify(moodLog)); // Update localStorage
  displayMoodLog(); // Refresh the displayed mood log
}

// Clear all mood log entries
document.getElementById('clearLog').addEventListener('click', function () {
  if (confirm("Are you sure you want to clear all mood entries?")) {
    localStorage.removeItem('moodLog');
    for (let mood in moodCounts) {
      moodCounts[mood] = 0; // Reset all mood counts
    }
    moodChart.data.datasets[0].data = Object.values(moodCounts);
    moodChart.update(); // Update the chart
    displayMoodLog(); // Refresh the displayed mood log after clearing
  }
});

// Display mood log on initial load
document.addEventListener('DOMContentLoaded', function () {
  displayMoodLog();
  // Initialize mood counts from localStorage
  let moodLog = JSON.parse(localStorage.getItem('moodLog')) || [];
  moodLog.forEach(entry => {
    moodCounts[entry.mood]++;
  });
  moodChart.data.datasets[0].data = Object.values(moodCounts);
  moodChart.update(); // Update the chart
});