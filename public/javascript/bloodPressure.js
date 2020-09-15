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
            backgroundColor: 'rgba(75, 192, 192, 1)'
        }],
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            }
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