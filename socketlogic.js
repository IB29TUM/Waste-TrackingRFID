// script.js

document.addEventListener('DOMContentLoaded', function () {
    const dataDisplay = document.getElementById('dataDisplay');

    // Assuming you have a WebSocket server that relays your TCP socket data
    const socket = new WebSocket('ws://localhost:8080');


socket.onmessage = function(event) {
    let rawData = event.data;

    // Remove non-numeric characters
    let cleanedData = rawData.replace(/[^\d]/g, '');

    // Determine name based on ID
    let name;
    switch (cleanedData) {
        case '3400000000000000000000000118':
            name = 'Electronics Detected';
            break;

        default:
            name = 'Electronics Detected'; // Default name if no specific ID is matched
            break;
    }

    // Check if a row with this ID already exists
    let existingRow = document.getElementById(cleanedData);
    if (!existingRow) {
        // Insert new row in the table if the ID is not found
        let table = document.getElementById('dataDisplay');
        let newRow = table.insertRow(-1);
        newRow.id = cleanedData; // Set the ID of the row to the RFID
        
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        

        cell1.textContent = cleanedData;
        cell2.textContent = name;
        cell3.textContent = "yes";
        
    }
};

socket.onerror = function(error) {
    console.log(`WebSocket Error: ${error}`);
};

});
