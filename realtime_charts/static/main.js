const ctx = document.getElementById('myChart').getContext('2d');

var chartsData = {
    type: 'bar',
    data: {
        labels: ['Visa', 'Master', 'Maestro', 'American Express', 'Cirrus', 'PayPal'],
        datasets: [{
            label: 'No. of Orders',
            data: [0,0,0,0,0,0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            barPercentage: 0.5
        }]
    },
    options: {
      scales: {
          x: {
          title: {
            display: true,
            text: 'Card Type',
            font: {
                size: 25
              }
            }
          }
      }
    }
}

const myChart = new Chart(ctx, chartsData);

console.log('Hello World!');

var socket = new WebSocket('ws://localhost:8000/ws/charts/')

socket.onmessage = function(e){
    const djangoData = JSON.parse(e.data);
    //console.log(djangoData);

    const chartsData = Object.values(djangoData.sales_data);
    const chartsLabels = Object.values(djangoData.labels);
    console.log(chartsData);
    console.log(chartsLabels);

    const n = 5;

    // looping from i = 0 to 5
    for (let i = 0; i <= n; i++) {
        myChart.data.labels[i] = chartsLabels[i]
        myChart.data.datasets[0].data[i] = chartsData[i];
    }

    myChart.update()

    //h1Element = document.getElementById("app")
    //if(typeof h1Element !== null && h1Element !== 'undefined' ) {
    //  document.getElementById("app").innerHTML = djangoData.value;;
    //}

    //h1Element = document.querySelector('#app')
    //if(typeof h1Element !== null && h1Element !== 'undefined' ) {
    //  document.querySelector('#app').innerText = djangoData.value;
    //}
}