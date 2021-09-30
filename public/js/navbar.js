//signup page constants and handlers
const homeNavbar = document.getElementById('navbar-home');
const searchNavbar = document.getElementById('navbar-search');
const myAccountNavbar = document.getElementById('navbar-my-account');



const navbarHander = async (event) => {
    event.preventDefault();
    if (event.target.id == homeNavbar.id) {
      alert(`home clicked`);
    } else if (event.target.id == searchNavbar.id) {
      alert(`search clicked`)
    } else {
      alert('my account clicked');
      document.location.replace('/api/mylist');
    }
    console.log(event);
}

homeNavbar.addEventListener('click', navbarHander);
searchNavbar.addEventListener('click', navbarHander);
myAccountNavbar.addEventListener('click', navbarHander);