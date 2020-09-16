  const bloodPressure = [];
    let chartBP;

makeChart();
    
async function makeChart(){
    await parseBP()
    const ctx = document.getElementById('bpChart').getContext('2d');
  
   console.log(chartBP);

    const myChart = new Chart(ctx, {
    type: 'scatter',
    data:{
        datasets: [{
            label: 'Blood Pressure',
            data: chartBP,
            backgroundColor: 'rgba(153, 102, 255, 1)'
        }],
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                ticks: {
                    min: 40,
                    max: 120,
                    stepSize: 10
                }
            }],
            yAxes: [{
                type: 'linear',
                ticks: {
                    min: 40,
                    max: 180,
                    stepSize: 10
                }
            }]
        }
    }
    });
}


async function getBP(){
        const response = await fetch('/api/posts');
        const data = await response.json();

    
        data.forEach(data => {
            const systolic = data.systolic_blood_pressure;
            const diastolic = data.diastolic_blood_pressure;
               bloodPressure.push({diastolic, systolic});
        })        
}
   console.log(bloodPressure);

async function parseBP (){
    await getBP()
    chartBP = bloodPressure.map(bp => ({
        x: bp.diastolic,
        y: bp.systolic
    }) )
}