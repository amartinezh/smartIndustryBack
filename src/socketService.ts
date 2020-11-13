
import { LogGrowPos } from "./models/smartIndustry/log";
import { LogEnum } from "./models/smartIndustry/log.enum";
import * as socketio from "socket.io"


export class SocketService {

    private static instance: SocketService;

    private log
    private io
    private connections: any[]

    private constructor(server: any) {
        this.connections = []
        this.io = socketio(server)
        this.io.origins('*:*') // for latest version
        this.io.on('connection', (socket) => {
            console.log('user connected');

            this.connections.push(socket)

            socket.on('disconnect', () => {
                let index = this.connections.findIndex(item => item.id === socket.id)
                this.connections.splice(index, 1)
                console.log('user disconnected');
            });

        });
        this.log = new LogGrowPos()
    }

    static getInstance() {
        try {
            return SocketService.instance;
        } catch (error) {
            //this.log.insertLog(LogEnum.ERROR, `${SocketService.name} -> ${this.getInstance.name}: ${error}`)
            console.log('An error occurred while the instance was returned ' + error + ` ${SocketService.name} -> ${this.getInstance.name}`);
        }
    }
    
    static start(server){
        SocketService.instance = new SocketService(server);
    }

    public emit(eventName: string, data: any) {
        try {
            this.io.emit(eventName, data)
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${SocketService.name} -> ${this.emit.name}: ${error}`)
        }
    }

}

