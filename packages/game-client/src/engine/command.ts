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

