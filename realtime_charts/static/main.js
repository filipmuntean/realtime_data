const ctx = document.getElementById('myChart').getContext('2d');

var chartsData = {
    type: 'bar',
    data: {
        labels: ['Visa', 'Master', 'Maestro', 'American Express', 'Cirrus', 'PayPal'],
        datasets: [{
            label: 'No. of Orders',
            data: [12, 19, 3, 5, 2, 3],
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
//alert(socket)

socket.onmessage = function(e){
    var djangoData = JSON.parse(e.data);
    console.log(djangoData);
    //alert(djangoData);
    //alert(djangoData.value);

    newChartsData = chartsData.data.datasets[0].data;
    newChartsData.shift();
    newChartsData.push(djangoData.value);
    chartsData.data.datasets[0].data = newChartsData;
    myChart.update()

    h1Element = document.getElementById("app")

    //alert(document.getElementById("app"));
    //alert(document.querySelector('#app'));
    //document.querySelector('#app').innerText = djangoData.value;
    if(typeof h1Element !== null && h1Element !== 'undefined' ) {
      document.getElementById("app").innerHTML = djangoData.value;;
    }
}