//home page signup button and handler
const homeSignUpButton = document.getElementById('signup');

const homeSignUpButtonHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/signup');
}

homeSignUpButton.addEventListener('click', homeSignUpButtonHandler);


