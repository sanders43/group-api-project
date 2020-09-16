async function loginFormHandler(event) {
    event.preventDefault();

    console.log("button clicked!");

    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        let userLoginResponse = await response.json();
        console.log(userLoginResponse);

<<<<<<< HEAD
         if (response.ok) {
             document.location.replace('/');
        } else {
              alert(response.statusText);
             alert("Incorrect email or password.  Please try again.");
         }
=======
        if (response.ok) {
            document.location.replace('/');
        } else {
            // alert(response.statusText);
            alert("Incorrect email or password.  Please try again.");
        }
>>>>>>> taylor
    }
}




document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
