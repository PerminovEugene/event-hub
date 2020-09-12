import { GameActor } from '../gameActor';

enum State {
    GoLeft = 'GoLeft',
    GoRight = 'GoRight',
    GoTop = 'GoTop',
    GoDown = 'GoDown',
    Stay = 'Stay',
}

const states = {
    [State.GoLeft]: {
        frames: [
            [10, 100, 28, 40],
            [36, 100, 28, 40],
            [62, 100, 28, 40],
        ]
    },
    [State.GoRight]: {
        frames: [
            [11, 54, 28, 40],
            [37, 54, 28, 40],
            [63, 54, 28, 40],
        ]
    },
    [State.GoTop]: {
        frames: [
            [10, 147, 28, 40],
            [36, 147, 28, 40],
            [62, 147, 28, 40],
        ]
    },
    [State.GoDown]: {
        frames: [
            [10, 10, 28, 40],
            [36, 10, 28, 40],
            [62, 10, 28, 40],
        ]
    },
    [State.Stay]: {
        frames: [
            [10, 290, 28, 40],
            [36, 290, 28, 40],
            [62, 290, 28, 40],
        ]
    }
}

export class Player extends GameActor {
    public goLeft() { this.state = State.GoLeft; }
    public goRight() { this.state = State.GoRight; }
    public goTop() { this.state = State.GoTop; }
    public goDown() { this.state = State.GoDown; }

    protected state: State = State.Stay;

    public draw(ctx: any) {
        var image = new Image(100, 100);
        image.onload = drawImageActualSize;
        image.src = 'Adventure%20time%20RPG_%20Jake%20the%20dog%20overworld%20by%20tebited15%20on%20DeviantArt.png'
        const playerThis = this;
        function drawImageActualSize(this: any) {
            const { frames } = states[playerThis.state];
            const framePosition = frames[playerThis.quant];
            ctx?.drawImage(this,
                framePosition[0], framePosition[1], framePosition[2], framePosition[3],
                100, 100, 28, 40
            );
        }
    }
}