//const signinButton = document.querySelector('#signin');
//const modalBg = document.querySelector('.modal-background');
//const modal = document.querySelector('.modal');
const homeSignUpButton = document.getElementById('signup');



const homeSignUpButtonHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/signup.html');
}

homeSignUpButton.addEventListener('click', homeSignUpButtonHandler);