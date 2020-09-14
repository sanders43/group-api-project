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
    const systolic_blood_pressure = document.querySelector('#inputBPSys').value;
    const diastolic_blood_pressure = document.querySelector('#inputBPDia').value;
    const heart_rate = document.querySelector('#inputHR').value;
    const exercise_duration = document.querySelector('#inputExerciseDuration').value;
    const exercise_type = document.querySelector('#inputExerciseType').value.trim();
    const water_consumed = document.querySelector('#inputWater').value;
    const emoji_feeling = document.querySelector('#inputEmoji').value;
    const comments = document.querySelector('#inputComments').value.trim();

    // const user_height = (user.height_feet * 12) + user.height_inches;
    const user_height = 74;
    console.log(user_height);

    const bmi = (weight/(user_height * user_height)) * 703;
    console.log(bmi);

    if (!weight) {
        alert("Please make sure to log your weight!");
        return;
    }

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            weight,
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

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-log-form').addEventListener('submit', newLogHandler);