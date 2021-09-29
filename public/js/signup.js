//const signinButton = document.querySelector('#signin');
//const modalBg = document.querySelector('.modal-background');
//const modal = document.querySelector('.modal');
const signUpButton = document.getElementById('signup');



const signUpButtonHandler = async (event) => {
    event.preventDefault();
    alert('signup');
    // const email = document.getElementById('modal-user-name').value.trim();
    // const password = document.getElementById('modal-password').value.trim();
    // //send the username and password to the db for validation
    // //if valid take the user to their homepage
    // if (email && password) {
    //     // Send a POST request to the API endpoint
    //     const response = await fetch('/api/users/login', {
    //         method: 'POST',
    //         body: JSON.stringify({ email, password }),
    //         headers: { 'Content-Type': 'application/json' },
    //     });

    //     if (response.ok) {
    //         // If successful, redirect the browser to the user's page
    //         document.location.replace('/api/mylist');
    //     } else {
    //         //display error if response is not ok
    //         alert('Failed to log in.');
    //     }
    // };
}

signUpButton.addEventListener('click', signUpButtonHandler);