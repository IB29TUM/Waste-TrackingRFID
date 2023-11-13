// script.js

document.addEventListener('DOMContentLoaded', function () {
    const dataDisplay = document.getElementById('dataDisplay');

    // Assuming you have a WebSocket server that relays your TCP socket data
    const socket = new WebSocket('ws://localhost:8080');


    socket.onmessage = function(event) {
        const data = event.data;


// const cleanedData = data.replace('\x02', '').replace('\x03', '').trim();
// const displayText = hexStringMappings[cleanedData] || `Received data: ${cleanedData}`;
        dataDisplay.textContent = data;
    };

    socket.onerror = function(error) {
        console.log(`WebSocket Error: ${error}`);
    };
});
