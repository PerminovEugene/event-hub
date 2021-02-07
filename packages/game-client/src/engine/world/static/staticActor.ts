import { GameActor } from '../gameActor';

// TODO move all actor params to props
// interface StaticActorParams {
//     realX: number;
//     realY: number;
//     width: number;
//     height: number;
    
//     pWidth: number;
//     pHeight: number;
// }

const width = 600;
const height = 600;

export class StaticActor extends GameActor {
    constructor(private params: { sprite: string, frames: number[][] }) {
        super();
    }
    
    protected image = new Image(width, height);

    public realX = 0;
    public realY = 0;

    protected _width: number = width;
    protected _height: number = height;

    // physical
    protected _pWidth:number = 25;
    protected _pHeight:number = 25;
    protected _verticalOffset:number = 273;
    protected _horisontalOffset:number = 288;

    public draw(ctx: CanvasRenderingContext2D) {
        const actorThis = this;
        function drawImageActualSize(this: any): any {
            const framePosition = actorThis.params.frames[0];
            ctx?.drawImage(this,
                framePosition[0], framePosition[1], framePosition[2], framePosition[3],
                actorThis.realX, actorThis.realY, 600, 600
            );
        }
        this.image.src = this.params.sprite;
        this.image.onload = drawImageActualSize;
    }
}
