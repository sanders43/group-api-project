const healthLogSeed = {
    weight: 225,
    systolic_blood_pressure: 120,
    diastolic_blood_pressure: 80,
    heart_rate: 75,
    exercise_duration: 60,
    exercise_type: "Cycling",
    water_consumed: 64,
    emoji_feeling: "🤢",
    comments: "Tired",
    bmi: 25
};

const healthLogSeedJSON = {
    "weight": 225,
    "systolic_blood_pressure": 120,
    "diastolic_blood_pressure": 80,
    "heart_rate": 75,
    "exercise_duration": 60,
    "exercise_type": "Cycling",
    "water_consumed": 64,
    "emoji_feeling": "🤢",
    "comments": "Tired",
};

async function newLogHandler(event) {

    event.preventDefault();

    const weight = document.querySelector('#inputWeight').value;
    let systolic_blood_pressure = document.querySelector('#inputBPSys').value;
    let diastolic_blood_pressure = document.querySelector('#inputBPDia').value;
    let heart_rate = document.querySelector('#inputHR').value;
    let exercise_duration = document.querySelector('#inputExerciseDuration').value;
    let exercise_type = document.querySelector('#inputExerciseType').value.trim();
    let water_consumed = document.querySelector('#inputWater').value;
    let emoji_feeling = document.querySelector('#inputEmoji').value;
    let comments = document.querySelector('#inputComments').value.trim();

    // const user_height = (user.height_feet * 12) + user.height_inches;
    const user_height = 74;
    console.log(user_height);

    const bmi = (weight/(user_height * user_height)) * 703;
    console.log(bmi);

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

    console.log(weight, systolic_blood_pressure, diastolic_blood_pressure, heart_rate, exercise_duration, exercise_type, water_consumed, emoji_feeling, comments);

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            weight,
            systolic_blood_pressure,
            diastolic_blood_pressure,
            bmi,
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

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-log-form').addEventListener('submit', newLogHandler);