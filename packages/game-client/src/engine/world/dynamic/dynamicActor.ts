import { GameActor } from '../gameActor';

export enum Direction {
    Left = 'Left',
    Right = 'Right',
    Down = 'Down',
    Top = 'Top'
};

export enum State {
    Stay = 'Stay',
    Go = 'Go',
}

export abstract class DynamicActor extends GameActor {
    public speed: number = 0;
    public maxSpeed: number = 0;
    public acceleration: number = 0;
    public state: State = State.Stay;
    public newState: State | null = State.Stay;
    public direction: Direction = Direction.Down;
    public newDirection: Direction = Direction.Down;
}
