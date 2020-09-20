const xdate = [];
const yheartRate = []

const id = document.querySelector('#user_id').innerHTML.trim();
// console.log(id);

makeChart();

async function makeChart() {

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

async function getHR() {

    const response = await fetch(`/api/posts/user/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    // console.log(response);

    const data = await response.json();
    // console.log(data);

    data.forEach(data => {
        const heartRate = data.heart_rate;
        yheartRate.push(heartRate);

        const date = data.created_at;
        xdate.push(date);
    }
    )
};

