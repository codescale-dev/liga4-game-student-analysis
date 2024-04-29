import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { SocketServer } from './infra/socket/SocketServer';

const app = express();

app.use(cors({
  origin: '*'
}))

app.use(json())
const server = http.createServer(app);

const socketServer = new SocketServer(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  socketServer.start();
  console.log(`Server running on port ${PORT}`);
});