console.log('Hello World!');

var socket = new WebSocket('ws://localhost:8000/ws/charts/')
//alert(socket)

socket.onmessage = function(e){
    var djangoData = JSON.parse(e.data);
    console.log(djangoData);
    //alert(djangoData);
    //alert(djangoData.value);

    h1Element = document.getElementById("app")

    //alert(document.getElementById("app"));
    //alert(document.querySelector('#app'));
    //document.querySelector('#app').innerText = djangoData.value;
    if(typeof h1Element !== null && h1Element !== 'undefined' ) {
      document.getElementById("app").innerHTML = djangoData.value;;
    }
}