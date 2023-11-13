// script.js

document.addEventListener('DOMContentLoaded', function () {
    const dataDisplay = document.getElementById('dataDisplay');

    // Assuming you have a WebSocket server that relays your TCP socket data
    const socket = new WebSocket('ws://localhost:8080');


    socket.onmessage = function(event) {
        const data = event.data;
        // Assuming the server sends data in a similar format as your Python script
        // const hexStringMappings = {
        //     "3400476C61737320202020202020": "Glass",
        //     "3400436F6C6120424F54544C4520": "CocaCola Bottle",
        //     "3400426F78202020202020202020": "Box",
        //     "3000E2801191A5030065B837C026": "Power Adapter"
        // };

// const cleanedData = data.replace('\x02', '').replace('\x03', '').trim();
// const displayText = hexStringMappings[cleanedData] || `Received data: ${cleanedData}`;
        dataDisplay.textContent = data;
    };

    socket.onerror = function(error) {
        console.log(`WebSocket Error: ${error}`);
    };
});
