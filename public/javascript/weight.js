const xWeight = []
const yWeight = []

makeWeightChart();
  
async function makeWeightChart(){
  await getWeight()
  const ctx = document.getElementById('weightChart').getContext('2d');


  const myChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: xWeight,
      datasets: [{
          label: 'Weight',
          data: yWeight,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
              
          borderWidth: 1
           }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      suggestedMin: 150,
                      suggestedMax: 250
                  }
              }]
          }
      }
  });
}

async function getWeight(){
      const response = await fetch('/api/posts');
      const data = await response.json();

      data.forEach(data => {
          const weight = data.weight;
          yWeight.push(weight);

          const date = data.created_at;
          xWeight.push(date);
      })
}