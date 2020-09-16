const user_id = window.location.toString().split('?')[
    window.location.toString().split('?').length - 1
];
console.log(user_id);

async function getUserProfile(event) {

    event.preventDefault();

    const response = await fetch(`/api/users/${user_id}`, {
        method: 'GET',

        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);

    let userLoginResponse = await response.json();
    // console.log(userLoginResponse);

    let userHeightInInches = (userLoginResponse.height_feet * 12) + userLoginResponse.height_inches;
    // console.log(userHeightInInches);

    if (response.ok) {
        editFormHandler(userHeightInInches);
    } else {
        alert(response.statusText);
    }

};


async function editFormHandler(userHeightInInches) {

    console.log('button clicked');

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(post_id);

    const post_id_trim = post_id.split(':')[0];
    console.log(post_id_trim);

    console.log('button clicked');
    

    //TODO: event listener/button click is working... now what to do with the edit...?
    //redirect to the original add-log page but with current info populated?

    const weight = document.querySelector('#inputWeight').value;
    let systolic_blood_pressure = document.querySelector('#inputBPSys').value;
    let diastolic_blood_pressure = document.querySelector('#inputBPDia').value;
    let heart_rate = document.querySelector('#inputHR').value;
    let exercise_duration = document.querySelector('#inputExerciseDuration').value;
    let exercise_type = document.querySelector('#inputExerciseType').value.trim();
    let water_consumed = document.querySelector('#inputWater').value;
    let emoji_feeling = document.querySelector('#inputEmoji').value;
    let comments = document.querySelector('#inputComments').value.trim();

    // console.log(userHeightInInches);

    const bmi = (weight / (userHeightInInches * userHeightInInches)) * 703;
    // console.log(bmi);

    if (!weight) {
        alert("Please make sure to log your weight!");
        return;
    };

    if (!systolic_blood_pressure) {
        systolic_blood_pressure = null;
    };
    if (!diastolic_blood_pressure) {
        diastolic_blood_pressure = null;
    };
    if (!heart_rate) {
        heart_rate = null;
    };
    if (!exercise_duration) {
        exercise_duration = null;
    };
    if (!exercise_type) {
        exercise_type = "";
    };
    if (!water_consumed) {
        water_consumed = null;
    };
    if (emoji_feeling === "Choose...") {
        emoji_feeling = "";
    };
    if (!comments) {
        comments = "";
    };

    // console.log(weight, systolic_blood_pressure, diastolic_blood_pressure, heart_rate, exercise_duration, exercise_type, water_consumed, emoji_feeling, comments);

    const response = await fetch(`/api/posts/${post_id_trim}`, {
        method: 'PUT',
        body: JSON.stringify({
            weight,
            bmi,
            systolic_blood_pressure,
            diastolic_blood_pressure,
            heart_rate,
            exercise_duration,
            exercise_type,
            water_consumed,
            emoji_feeling,
            comments
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);

    // let userLoginResponse = await response.json();
    // console.log(userLoginResponse);

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}


document.querySelector('#edit-log-btn').addEventListener('click', getUserProfile);