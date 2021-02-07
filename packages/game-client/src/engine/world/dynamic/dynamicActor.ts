import { GameActor } from '../gameActor';
import { ActorStatesParams, Direction, State } from '../../types';

export abstract class DynamicActor extends GameActor {
    public speed: number = 0;
    public maxSpeed: number = 0;
    public acceleration: number = 0;
    public state: State = State.Stay;
    public newState: State = State.Same;
    public direction: Direction = Direction.Down;
    public newDirection: Direction = Direction.Down;

    constructor(protected params: { states: ActorStatesParams, sprite: string }) {
        super();
        this._maxQuant = 0;
    }

    /**
     * Updated max quant for dynamic actor. Should be called after assignment new state.
     */
    public updateMaxQuant() {
        this._maxQuant = this.params.states[this.newState][this.direction].frames.length - 1;
    }
}
