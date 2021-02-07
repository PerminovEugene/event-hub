import { Player } from './world/dynamic/player';
import { DynamicActor } from './world/dynamic/dynamicActor';

enum CommandName {
    goLeft = 'goLeft',
    goRight = 'goRight',
    goTop = 'goTop',
    goDown = 'goDown',
    stopGoLeft = 'stopGoLeft',
    stopGoRight = 'stopGoRight',
    stopGoTop = 'stopGoTop',
    stopGoDown = 'stopGoDown',
}

export abstract class Command {
    private _timestamp: Date;

    constructor(protected actor: Player, public name: CommandName) {
        this._timestamp = new Date();
    }

    public abstract execute(): void;

    get timestamp() {
        return this._timestamp;
    }
}

export class GoLeftCommand extends Command {
    execute() {
        this.actor.goLeft();
    }
}

export class GoRightCommand extends Command {
    execute() {
        this.actor.goRight();
    }
}

export class GoTopCommand extends Command {
    execute() {
        this.actor.goTop();
    }
}

export class GoDownCommand extends Command {
    execute() {
        this.actor.goDown();
    }
}

export class StopGoLeftCommand extends Command {
    execute() {
        this.actor.stopGoLeft();
    }
}

export class StopGoRightCommand extends Command {
    execute() {
        this.actor.stopGoRight();
    }
}

export class StopGoTopCommand extends Command {
    execute() {
        this.actor.stopGoTop();
    }
}

export class StopGoDownCommand extends Command {
    execute() {
        this.actor.stopGoDown();
    }
}
