import { Direction, State } from "../engine/types";

export const getStore = () => ({
    dynamicObjects: {
        players: [{
            states: {
                [State.Go]: {
                    [Direction.Left]: {
                        frames: [
                            [10, 100, 28, 40],
                            [36, 100, 28, 40],
                            [62, 100, 28, 40],
                            [36, 100, 28, 40],
                        ]
                    },
                    [Direction.Right]: {
                        frames: [
                            [11, 54, 28, 40],
                            [37, 54, 28, 40],
                            [63, 54, 28, 40],
                            [37, 54, 28, 40],
                        ]
                    },
                    [Direction.Top]: {
                        frames: [ 
                            [10, 147, 28, 40],
                            [36, 147, 28, 40],
                            [62, 147, 28, 40],
                            [36, 147, 28, 40],
                        ]
                    },
                    [Direction.Down]: {
                        frames: [
                            [10, 10, 28, 40],
                            [36, 10, 28, 40],
                            [62, 10, 28, 40],
                            [36, 10, 28, 40],
                        ]
                    },
                },
                [State.Stay]: {
                    [Direction.Left]: {
                        frames: [
                            [36, 100, 28, 40],
                        ]
                    },
                    [Direction.Right]: {
                        frames: [
                            [37, 54, 28, 40],
                        ]
                    },
                    [Direction.Top]: {
                        frames: [ 
                            [36, 147, 28, 40],
                        ]
                    },
                    [Direction.Down]: {
                        frames: [
                            [36, 10, 28, 40],
                        ]
                    },
                },
            },
            sprite: 'Adventure%20time%20RPG_%20Jake%20the%20dog%20overworld%20by%20tebited15%20on%20DeviantArt.png'
        
        }]
    },
    staticObjects:
        [{
            realX: 110,
            realY: 100,
            frames: [[0, 0, 600, 600]],
            sprite: 'tree.png',
    }]
});
