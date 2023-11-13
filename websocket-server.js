const WebSocket = require('ws');
const net = require('net');

const DEVICE_IP = '169.254.148.176';  // Device's IP address
const PORT = 2112;  // The port the device is listening on

// WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// TCP Client connection to your device
const tcpClient = new net.Socket();
tcpClient.connect(PORT, DEVICE_IP, () => {
    console.log('Connected to TCP socket');
});


// Relay TCP data to WebSocket clients
tcpClient.on('data', (data) => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data.toString());
        }
    });
});

tcpClient.on('error', (error) => {
    console.error('TCP Socket Error:', error);
});

wss.on('connection', ws => {
    console.log('WebSocket client connected');
    ws.on('error', error => console.error('WebSocket Error:', error));
});
