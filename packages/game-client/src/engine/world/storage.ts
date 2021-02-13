import { FrameTuple } from '../types';
import { DynamicActor } from './dynamic/dynamicActor';
import { Player } from './dynamic/player';
import { StaticActor } from './static/staticActor';

export class WorldStorage {
    protected _dynamic: Array<DynamicActor> = [];
    // protected _player: Player;
    protected _static: Array<StaticActor> = [];
 
    constructor(loadedData: any) {
        // this._player = new Player({
        //     // TODO temporary 0
        //     states: loadedData.dynamicObjects.players[0].states,
        //     sprite: loadedData.dynamicObjects.players[0].sprite,
        // });
        // this._dynamic.push(this._player);

        // loadedData.staticObjects.forEach(
        //     (actorData: { realX: number, realY: number, frames: FrameTuple, sprite: string}) => {
        //         this._static.push(this.createStaticActor(actorData));
        //     }
        // );
    }

    createStaticActor(actorData: {
            realX: number, realY: number, frames: FrameTuple, sprite: string
        }) {
        const staticActor = new StaticActor({
            frames: actorData.frames,
            sprite: actorData.sprite,
        });
        staticActor.realX = actorData.realX;
        staticActor.realY = actorData.realY;
        return staticActor;
    }

    get dynamic(): Array<DynamicActor> {
        return this._dynamic;
    }

    get static(): Array<StaticActor> {
        return this._static;
    }

    // get player(): Player {
        // return this._player;
    // }

    public tick() {
        this._dynamic.forEach(actor => {
            actor.tick();
        });
    }
}

export let world: WorldStorage;
export const createWorldStorage = (loadedData: any) => {
    if (!world) {
        world = new WorldStorage(loadedData);
    }
}
