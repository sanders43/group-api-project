const signupSeed = {
    firstName: "John",
    lastName: "Smith",
    email: "johnsmith@gmail.com",
    password: "hashedPassword",
    gender: "male",
    heightFeet: "5",
    heightInches: "11",
    birthday: "01/02/25"
};

const healthLogSeed = {
    weight: 175,
    bloodPressure: "120/80",
    heartRate: 65,
    exerciseDuration: 30,
    exerciseType: "running",
    waterDrank: 32,
    comments: "I feel great!"
};




// async function signupFormHandler(event) {

//     event.preventDefault();

//     console.log("button clicked!");

//     const firstName = document.querySelector('#inputFirstName').value.trim();
//     const lastName = document.querySelector('#inputLastName').value.trim();
//     const email = document.querySelector('#inputEmail').value.trim();
//     const password = document.querySelector('#inputPassword').value.trim();
//     const heightFeet = document.querySelector('#inputHeightFeet').value.trim();
//     const heightInches = document.querySelector('#inputHeightInches').value.trim();
//     const gender = document.querySelector('#inputGender').value.trim();
//     const birthday = document.querySelector('#inputBirthday').value.trim();
    

//     if (firstName && lastName && email && password && heightFeet && heightInches && gender && birthday) {
//         const response = await fetch('/api/users', {
//             method: 'post',
//             body: JSON.stringify({
//                 firstName,
//                 lastName,
//                 email,
//                 password,
//                 heightFeet,
//                 heightInches,
//                 gender,
//                 birthday
//             }),
//             headers: { 'Content-Type': 'application/json' }
//         });
//         console.log(response);

//         // check the response status
//         if (response.ok) {
//             console.log('success');
//             document.location.replace('/dashboard');
//         } else {
//             alert(response.statusText);
//         }
//     }
// };


function signupFormHandler(event) {

    event.preventDefault();

    console.log("button clicked!");

    const firstName = document.querySelector('#inputFirstName').value.trim();
    const lastName = document.querySelector('#inputLastName').value.trim();
    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();
    const heightFeet = document.querySelector('#inputHeightFeet').value.trim();
    const heightInches = document.querySelector('#inputHeightInches').value.trim();
    const gender = document.querySelector('#inputGender').value.trim();
    const birthday = document.querySelector('#inputBirthday').value.trim();

    const privacyPolicy = document.querySelector('#gridCheck');
    // console.log(privacyPolicy.checked);

    if (!privacyPolicy.checked) {
        alert("Please select that you've read and agree to our privacy policy!");
        return;
    };

    if (password.length < 4) {
        console.log(password.length);
        alert("Password must be longer than 4 characters.  Please try again.");
        return;
    };

    if (!firstName || !lastName || !email || !password || !heightFeet || !heightInches ||!gender || !birthday) {
        alert("Please make sure all of the fields are filled in!");
        return;
    };


    

    if (firstName && lastName && email && password && heightFeet && heightInches && gender && birthday) {
        const response = {
            method: 'post',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                heightFeet,
                heightInches,
                gender,
                birthday
            }),
            headers: { 'Content-Type': 'application/json' }
        };
        console.log(response);

        // check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};












document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);