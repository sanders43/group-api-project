async function editFormHandler(event) {

    event.preventDefault();

    // TODO: make this work...
    const id = req.session.user_id;
    console.log(id);

    console.log("button clicked!");

    const first_name = document.querySelector('#inputFirstName').value.trim();
    const last_name = document.querySelector('#inputLastName').value.trim();
    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();
    const height_feet = document.querySelector('#inputHeightFeet').value.trim();
    const height_inches = document.querySelector('#inputHeightInches').value.trim();
    const gender = document.querySelector('#inputGender').value.trim();
    const birthday = document.querySelector('#inputBirthday').value.trim();

    // const privacyPolicy = document.querySelector('#gridCheck');
    // // console.log(privacyPolicy.checked);

    // if (!privacyPolicy.checked) {
    //     alert("Please select that you've read and agree to our privacy policy!");
    //     return;
    // };

    if (password.length < 4) {
        console.log(password.length);
        alert("Password must be longer than 4 characters.  Please try again.");
        return;
    };

    if (!first_name || !last_name || !email || !password || !height_feet || !height_inches || !gender || !birthday) {
        alert("Please make sure all of the fields are filled in!");
        return;
    };

    if (first_name && last_name && email && password && height_feet && height_inches && gender && birthday) {
        // TODO: need to find a way to get user id for below...
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
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
        console.log(response);

        // check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.edit-user-profile').addEventListener('submit', editFormHandler);