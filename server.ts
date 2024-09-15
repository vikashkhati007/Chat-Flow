import express from 'express';
import axios from 'axios';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

import http from 'http';
import { Server } from 'socket.io';

app.prepare().then(async () => {
    const server = express();
    const httpServer = http.createServer(server);
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('message1', (data) => {
            console.log('Recieved from API ::', data)
            io.emit('message2', data);
        })
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})