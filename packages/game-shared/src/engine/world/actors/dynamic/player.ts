// import { Direction, DynamicActor, State } from './dynamicActor';

// const states = {
//     [State.Go]: {
//         [Direction.Left]: {
//             frames: [
//                 [10, 100, 28, 40],
//                 [36, 100, 28, 40],
//                 [62, 100, 28, 40],
//                 [36, 100, 28, 40],
//             ]
//         },
//         [Direction.Right]: {
//             frames: [
//                 [11, 54, 28, 40],
//                 [37, 54, 28, 40],
//                 [63, 54, 28, 40],
//                 [37, 54, 28, 40],
//             ]
//         },
//         [Direction.Top]: {
//             frames: [ 
//                 [10, 147, 28, 40],
//                 [36, 147, 28, 40],
//                 [62, 147, 28, 40],
//                 [36, 147, 28, 40],
//             ]
//         },
//         [Direction.Down]: {
//             frames: [
//                 [10, 10, 28, 40],
//                 [36, 10, 28, 40],
//                 [62, 10, 28, 40],
//                 [36, 10, 28, 40],
//             ]
//         },
//     },
//     [State.Stay]: {
//         [Direction.Left]: {
//             frames: [
//                 [36, 100, 28, 40],
//             ]
//         },
//         [Direction.Right]: {
//             frames: [
//                 [37, 54, 28, 40],
//             ]
//         },
//         [Direction.Top]: {
//             frames: [ 
//                 [36, 147, 28, 40],
//             ]
//         },
//         [Direction.Down]: {
//             frames: [
//                 [36, 10, 28, 40],
//             ]
//         },
//     }
// }
// const jakeSprite = 'Adventure%20time%20RPG_%20Jake%20the%20dog%20overworld%20by%20tebited15%20on%20DeviantArt.png';


// export class Player extends DynamicActor {
//     public speed = 0;
//     public maxSpeed= 2;
//     public acceleration = 1;

//     protected _width: number = 28;
//     protected _height: number = 40;

//     // physical
//     protected _pWidth:number = 24;
//     protected _pHeight:number = 34;
//     protected _verticalOffset:number = 2;
//     protected _horisontalOffset:number = 2;

//     constructor() {
//         super();
//         this.maxQuant = 0;
//     }

//     public goLeft() { this.go(); this.turnTo(Direction.Left);  }
//     public goRight() { this.go(); this.turnTo( Direction.Right); }
//     public goTop() { this.go(); this.turnTo(Direction.Top); }
//     public goDown() { this.go(); this.turnTo(Direction.Down); }

//     public stopGoLeft() { this.stop(); }
//     public stopGoRight() { this.stop(); }
//     public stopGoTop() { this.stop(); }
//     public stopGoDown() { this.stop(); }

//     private turnTo(direction: Direction) {
//         if (this.state === State.Stay && this.newState === State.Go) {
//             this.newDirection = direction;
//         }
//     }

//     private go() {
//         if (this.state !== State.Go) {
//             this.resetQuant();
//             this.newState = State.Go;
//             this.maxQuant = 3;
//         }
//     }

//     private stop() {
//         if (this.state !== State.Stay) {
//             this.maxQuant = 0;
//             this.newState = State.Stay;
//             this.resetQuant();
//         }
//     }

//     protected image = new Image(30, 40);

//     private previousX: number = 0;
//     private previousY: number = 0;

//     public prev: any = [];
//     public draw(ctx: CanvasRenderingContext2D) {
//         const playerThis = this;
//         function drawImageActualSize(this: any): any {
//             const { frames } = states[playerThis.state][playerThis.direction];
            
//             if (playerThis.prev[0] !== playerThis.state || playerThis.prev[1] !== playerThis.direction) {
//                 console.log(playerThis.state, playerThis.direction)
//                 playerThis.prev[0] = playerThis.state;
//                 playerThis.prev[1] = playerThis.direction;
//             }
            
//             const framePosition = frames[playerThis.quant];
//             ctx.clearRect(playerThis.previousX, playerThis.previousY, playerThis.width, playerThis.height);
//             ctx?.drawImage(this,
//                 framePosition[0], framePosition[1], framePosition[2], framePosition[3],
//                 playerThis.realX, playerThis.realY, playerThis.width, playerThis.height
//             );
//             playerThis.previousX = playerThis.realX;
//             playerThis.previousY = playerThis.realY;
//         }
//         this.image.src = jakeSprite;
//         this.image.onload = drawImageActualSize;
//     }
// }
