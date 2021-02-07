import { DynamicActor } from "./actors/dynamic/dynamicActor";
import { StaticActor } from "./actors/static/staticActor";
import { WorldSetupException } from "./worldErrors";
import { WorldGenerator } from "./worldGenerator";

export type WorldConfig = {
    width: number;
    height: number;
}

/**
 * All information about objects and their attributes in current game session
 * Kind of storage
 */
export abstract class World {
    /**
     * Playes, bots and dynamic neutral objects (arrows, etc)
     */
    protected _dynamic: Array<DynamicActor> = [];
    
    /**
     * All objects which couldn't move
     */
    protected _static: Array<StaticActor> = [];
    
    private _generated = false;

    constructor(private config: WorldConfig) {}

    public abstract generate(): Promise<void> 

    // public generate() {
    //     if (this._generated) {
    //         throw new WorldSetupException('Can not regenerate world');
    //     }
    //     this._generated = true;

    //     /**
    //      * Later it is possible to improve generation parametrs in many ways
    //      */
    //     const generator = new WorldGenerator()
    //     generator.generateTrees(10);
    // }

    get dynamic(): Array<DynamicActor> { return this._dynamic; }
    get static(): Array<StaticActor> { return this._static; }

    // get player(): Player {
    //     return this._player;
    // }
}