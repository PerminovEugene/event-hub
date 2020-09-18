// import { GameActor } from './world/gameActor';
import { Player } from './world/dynamic/player';

export abstract class Command {
    constructor(protected actor: Player) {}

    public abstract execute(): void;
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
