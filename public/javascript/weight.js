const xWeight = []
const yWeight = []

makeWeightChart();

async function makeWeightChart() {
    await getWeight()
    const ctx = document.getElementById('weightChart').getContext('2d');


    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xWeight,
            datasets: [{
                label: 'Weight',
                data: yWeight,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',

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

async function getWeight() {

    const response = await fetch(`/api/posts/user/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    // console.log(response);

    const data = await response.json();
    // console.log(data);

    data.forEach(data => {
        const weight = data.weight;
        yWeight.push(weight);

        const date = data.created_at;
        xWeight.push(date);
    })
};

