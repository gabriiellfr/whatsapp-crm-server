const WebSocket = require('ws');
const url = require('url');

let wsServer;
const clients = new Map();

const setup = (server) => {
    wsServer = new WebSocket.Server({ server });

    wsServer.on('connection', (ws, req) => {
        const params = new URLSearchParams(url.parse(req.url).search);
        const sessionId = params.get('sessionId');

        console.log('Client connected', sessionId);

        if (!sessionId) {
            ws.close();
            return;
        }

        registerClient(sessionId, ws);

        ws.on('message', (message) => {
            console.log(`Received message from client: ${message}`);
        });

        ws.on('close', () => {
            console.log('Client disconnected', sessionId);
        });
    });

    console.log('Socket server is ready.');
};

const sendToClient = (sessionId, data) => {
    const clientsForSession = clients.get(sessionId) || [];

    clientsForSession.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

const registerClient = (sessionId, client) => {
    const clientsForSession = clients.get(sessionId) || [];
    clientsForSession.push(client);
    clients.set(sessionId, clientsForSession);
};

module.exports = {
    setup,
    registerClient,
    sendToClient,
};
