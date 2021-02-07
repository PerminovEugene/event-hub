import { queue } from '../queue';
import io from 'socket.io-client';
import { Command } from '../command';

const socket = io();
export class Transport {
    private socket: any; // TODO

    public connect() {
       this.socket = io('http://localhost:8080')
    }

    public attachHandlers() {
        this.socket.on('connect', function(){
            console.log('connected');
        });
        this.socket.on('updateWorld', function(data: unknown){
            console.log(data);
        });

        this.socket.on('disconnect', function(){
            console.log('disconnected');
        });
    }

    public sendUserEvents() {
        if (queue.items.length) {
            this.socket.send('userEvents', this.convertQueue(queue.items));
        }
    }

    public convertQueue(commands: Array<Command>) {
        return commands.map((command: Command) => ({
            command: command.name,
            timestamp: command.timestamp
        }))
    }
}
