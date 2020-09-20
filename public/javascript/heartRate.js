const xdate = [];
const yheartRate = []

makeChart();
  
async function makeChart(){
  await getHR()
  const ctx = document.getElementById('hrChart').getContext('2d');


  const myChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: xdate,
      datasets: [{
          label: 'Heart Rate',
          data: yheartRate,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
              
          borderWidth: 1
           }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      suggestedMin: 50,
                      suggestedMax: 80
                  }
              }]
          }
      }
  });
}

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

async function getHR(){
      const response = await fetch('/api/posts');
      const data = await response.json();

  
      data.forEach(data => {
          const heartRate = data.heart_rate;
          yheartRate.push(heartRate);

          const date = data.created_at;
          xdate.push(date);
      })
}

