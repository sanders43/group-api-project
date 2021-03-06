const signupSeed = {
    first_name: "John",
    last_name: "Smith",
    email: "johnsmith@gmail.com",
    password: "hashedPassword",
    gender: "Male",
    height_feet: "5",
    height_inches: "11",
    birthday: "02/25/1990"
};

const signupSeedJSON = {
    "first_name": "John",
    "last_name": "Smith",
    "email": "johnsmith@gmail.com",
    "password": "hashedPassword",
    "gender": "male",
    "height_feet": "5",
    "height_inches": "11",
    "birthday": "02/25/1990"
};

async function signupFormHandler(event) {

    event.preventDefault();

    // console.log("button clicked!");

    const first_name = document.querySelector('#inputFirstName').value.trim();
    const last_name = document.querySelector('#inputLastName').value.trim();
    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();
    const height_feet = document.querySelector('#inputHeightFeet').value.trim();
    const height_inches = document.querySelector('#inputHeightInches').value.trim();
    const gender = document.querySelector('#inputGender').value.trim();
    const inputBirthday = document.querySelector('#inputBirthday').value.trim();
    // console.log(inputBirthday);

    const birthday = (inputBirthday.split("-"))[1] + "/" + (inputBirthday.split("-"))[2] + "/" + (inputBirthday.split("-"))[0];
    // console.log(birthday);

    const privacyPolicy = document.querySelector('#gridCheck');
    // console.log(privacyPolicy.checked);

    if (!privacyPolicy.checked) {
        alert("Please select that you've read and agree to our privacy policy!");
        return;
    };

    if (password.length < 4) {
        // console.log(password.length);
        alert("Password must be longer than 4 characters.  Please try again.");
        return;
    };

    if (!first_name || !last_name || !email || !password || !height_feet || !height_inches || !gender || !birthday) {
        alert("Please make sure all of the fields are filled in!");
        return;
    };




    if (first_name && last_name && email && password && height_feet && height_inches && gender && birthday) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password,
                gender,
                height_feet,
                height_inches,
                birthday
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // console.log(response);

        // check the response status
        if (response.ok) {
            // console.log('success');
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};












document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);