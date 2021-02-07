import { Command } from './command';

class Queue {
    private queue: Array<Command> = [];

    public add(command: Command) {
        this.queue.push(command)
    }

    public take(): Command | undefined {
        return this.queue.shift();
    }

    public isEmpty() {
        return !this.queue.length;
    }

    get items() {
        return this.queue
    }
}

export const queue = new Queue();