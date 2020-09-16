const xWater = [];
const yWater = []

makeChart();
  
async function makeChart(){
  await getWater()
  const ctx = document.getElementById('waterChart').getContext('2d');


  const myChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: xWater,
      datasets: [{
          label: 'Water Consumed',
          data: yWater,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
              
          borderWidth: 1
           }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      suggestedMin: 10,
                      suggestedMax: 80
                  }
              }]
          }
      }
  });
}

async function getWater(){
      const response = await fetch('/api/posts');
      const data = await response.json();

  
      data.forEach(data => {
          const water = data.water_consumed;
          yWater.push(water);

          const date = data.created_at;
          xWater.push(date);
      })
}

