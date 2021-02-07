export enum Direction {
    Left = 'Left',
    Right = 'Right',
    Down = 'Down',
    Top = 'Top'
};

export enum State {
    Stay = 'Stay',
    Go = 'Go',
    Same = 'Same',
}

export type FrameTuple = any; //[number, number, number, number];

export type ActorStatesParams = {
    [key in State]: {
        [key in Direction]: {
            frames: FrameTuple[];
        } 
    }
}