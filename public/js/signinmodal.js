// Sign In Modal 

const signinButton = document.querySelector('#signin');
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
const modalSignInButton = document.getElementById('modal-sign-in-button');

signinButton.addEventListener('click', () => {
    modal.classList.add('is-active');
});

modalBg.addEventListener('click', () => {
    //alert('modalBg is clicked!')
    modal.classList.remove('is-active');
});

const modalSignInButtonHandler = async (event) => {
    event.preventDefault();
    const email = document.getElementById('modal-user-name').value.trim();
    const password = document.getElementById('modal-password').value.trim();
    //send the username and password to the db for validation
    //if valid take the user to their homepage
    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the user's page
            document.location.replace('/api/mylist');
        } else {
            //display error if response is not ok
            alert('Failed to log in.');
        }
    };
}

modalSignInButton.addEventListener('click', modalSignInButtonHandler);