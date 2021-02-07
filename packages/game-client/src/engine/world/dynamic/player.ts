import { Direction, DynamicActor, State } from './dynamicActor';

export class Player extends DynamicActor {
    public speed = 0;
    public maxSpeed= 2;
    public acceleration = 1;

    protected _width: number = 28;
    protected _height: number = 40;

    // physical
    protected _pWidth:number = 24;
    protected _pHeight:number = 34;
    protected _verticalOffset:number = 2;
    protected _horisontalOffset:number = 2;

    constructor(private params: { states: any, sprite: string }) {
        super();
        this.maxQuant = 0;
    }

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
        if (this.state !== State.Go) {
            this.resetQuant();
            this.newState = State.Go;
            this.maxQuant = 3;
        }
    }

    private stop() {
        if (this.state !== State.Stay) {
            this.maxQuant = 0;
            this.newState = State.Stay;
            this.resetQuant();
        }
    }

    protected image = new Image(30, 40);

    private previousX: number = 0;
    private previousY: number = 0;

    public prev: any = [];
    public draw(ctx: CanvasRenderingContext2D) {
        const playerThis = this;
        function drawImageActualSize(this: any): any {
            const { frames } = playerThis.params.states[playerThis.state][playerThis.direction];
            console.log('ss');
            if (playerThis.prev[0] !== playerThis.state || playerThis.prev[1] !== playerThis.direction) {
                console.log(playerThis.state, playerThis.direction)
                playerThis.prev[0] = playerThis.state;
                playerThis.prev[1] = playerThis.direction;
            }
            
            const framePosition = frames[playerThis.quant];
            ctx.clearRect(playerThis.previousX, playerThis.previousY, playerThis.width, playerThis.height);
            ctx?.drawImage(this,
                framePosition[0], framePosition[1], framePosition[2], framePosition[3],
                playerThis.realX, playerThis.realY, playerThis.width, playerThis.height
            );
            playerThis.previousX = playerThis.realX;
            playerThis.previousY = playerThis.realY;
        }
        this.image.src = this.params.sprite;
        this.image.onload = drawImageActualSize;
    }
}
