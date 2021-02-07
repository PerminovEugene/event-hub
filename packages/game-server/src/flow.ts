type UserEvent = {
    timestamp: Date;
    command: string;
}

export class Flow {
    private mainThread: Array<UserEvent> = [];
    
    public merge(events: Array<UserEvent>) {
        this.mainThread.push(...events);
    }
}