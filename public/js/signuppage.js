//signup page constants and handlers
const emailField = document.getElementById('email-field');
const userNameField = document.getElementById('username-field');
const passwordField = document.getElementById('password-field');


const signUpButton = document.getElementById('sign-up');

const signUpButtonHandler = async (event) => {
    event.preventDefault();
    //document.location.replace('/signup.html');
    const email = emailField.value.trim();
    const username = userNameField.value.trim();
    const password = passwordField.value.trim();

    if (email && username && password) {
      alert (`${email} ${username} ${password}`)
    } else {
      alert ('enter the data');
    }
}

signUpButton.addEventListener('click', signUpButtonHandler);

