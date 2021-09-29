//signup page constants and handlers
const emailField = document.getElementById('email-field');
const userNameField = document.getElementById('username-field');
const passwordField = document.getElementById('password-field');


const signUpButton = document.getElementById('sign-up');

const signUpButtonHandler = async (event) => {
    event.preventDefault();
    const user_email = emailField.value.trim();
    const user_name = userNameField.value.trim();
    const user_password = passwordField.value.trim();

    //if all the data is entered, call the post to create a new user
    if (user_email && user_name && user_password) {
      const response = await fetch('/api/users', {
        method: 'POST', 
        body: JSON.stringify({ user_name, user_email, user_password}), 
        headers: {'Content-Type': 'application/json'}
      });
      if (response.ok) {
        document.location.replace('/api/mylist')
      } else {
        alert(`response not oke ${response.statusText}`)
      }
    } else {
      //show a prompt to enter all data
      alert ('Invalid Username, email, or password');
    }
}

signUpButton.addEventListener('click', signUpButtonHandler);

