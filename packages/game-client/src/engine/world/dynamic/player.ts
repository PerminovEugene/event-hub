import { Direction, DynamicActor, State } from './dynamicActor';

const states = {
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
    }
}
const jakeSprite = 'Adventure%20time%20RPG_%20Jake%20the%20dog%20overworld%20by%20tebited15%20on%20DeviantArt.png';


export class Player extends DynamicActor {
    public speed = 0;
    public maxSpeed= 5;
    public acceleration = 1;

    public goLeft() { this.go(); this.turnTo(Direction.Left);  }
    public goRight() { this.go(); this.turnTo( Direction.Right); }
    public goTop() { this.go(); this.turnTo(Direction.Top); }
    public goDown() { this.go(); this.turnTo(Direction.Down); }

    public stopGoLeft() { this.stop(); }
    public stopGoRight() { this.stop(); }
    public stopGoTop() { this.stop(); }
    public stopGoDown() { this.stop(); }

    private turnTo(direction: Direction) {
        if (this.state === State.Stay && this.newState === State.Go) {
            this.newDirection = direction;
        }
    }

    private go() {
        if (this.state === State.Stay) {
            this.newState = State.Go;
        }
    }

    private stop() {
        this.newState = State.Stay;
    }

    protected image = new Image(100, 100);

    public draw(ctx: any) {
        this.image.onload = drawImageActualSize;
        this.image.src = jakeSprite;
        const playerThis = this;
        function drawImageActualSize(this: any) {
            const { frames } = states[playerThis.state][playerThis.direction];
            const framePosition = frames[playerThis.quant];
            ctx?.drawImage(this,
                framePosition[0], framePosition[1], framePosition[2], framePosition[3],
                playerThis.realX, playerThis.realY, 28, 40
            );
        }
    }
}
