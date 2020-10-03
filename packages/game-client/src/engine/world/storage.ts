import { DynamicActor } from './dynamic/dynamicActor';
import { Player } from './dynamic/player';
import { StaticActor } from './static/staticActor';
import { Tree } from './static/tree';

export class WorldStorage {
    protected _dynamic: Array<DynamicActor> = [];
    protected _player: Player;
    protected _static: Array<StaticActor> = [];
 
    constructor() {
        this._player = new Player();
        this._dynamic.push(this._player);
        this._static.push(new Tree());
    }

    get dynamic(): Array<DynamicActor> {
        return this._dynamic;
    }

    get static(): Array<StaticActor> {
        return this._static;
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
