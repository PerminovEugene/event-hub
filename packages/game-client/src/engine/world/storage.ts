import { DynamicActor } from './dynamic/dynamicActor';
import { Player } from './dynamic/player';

export class WorldStorage {
    protected _dynamic: Array<DynamicActor> = [];
    protected _player: Player;

    constructor() {
        this._player = new Player();
        this._dynamic.push(this._player);
    }

    get dynamic(): Array<DynamicActor> {
        return this._dynamic;
    }

    get player(): Player {
        return this._player;
    }

    public tick() {
        this._dynamic.forEach(actor => {
            actor.tick();
        });
    }
}

export const world = new WorldStorage();
