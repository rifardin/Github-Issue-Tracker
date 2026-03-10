document.getElementById('loginForm').addEventListener('submit', function() {

            const user = document.getElementById('username').value;
            const pass = document.getElementById('password').value;

            if(user === 'admin' && pass === 'admin123') {
                alert('Log In Successfull!');
            } else {
                alert('Invalid Password');
            }
        });