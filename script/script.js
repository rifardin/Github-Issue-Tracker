document.getElementById('loginForm').addEventListener('submit', function(event) {
    
    event.preventDefault(); 

    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
        alert('Log In Successful!');
      
        window.location.assign('./home.html');
    } else {
        alert('Invalid Password! Try again.');
    }
});