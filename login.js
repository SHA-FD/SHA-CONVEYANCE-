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