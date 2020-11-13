
import app from './app';
import {SocketService} from "./socketService"
import * as http from "http"
import * as dotenv from "dotenv"

dotenv.config();
const PORT = `${process.env.PORT}`;
const HOST = `${process.env.HOST}`
const server = http.createServer(app);
const sockets = SocketService.start(server)
/*
const io = socketio(server)
io.origins('*:*') // for latest version
io.on('connection', (socket) => {
    socket.emit('order', 'hello')
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('my message', (msg) => {
        console.log('message: ' + msg);
    });

});*/
//io.emit() for bradcast

server.listen(PORT, () => {
    console.log('smartIndustry server listening on port ' + PORT);
})