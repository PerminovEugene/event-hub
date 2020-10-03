import { StaticActor } from './staticActor';

const data = {
    frames: [
        [0, 0, 600, 600],
    ]
}
const sprite = 'tree.png';

export class Tree extends StaticActor {
    protected image = new Image(600, 600);

    public realX = 0;
    public realY = 0;

    protected _width: number = 600;
    protected _height: number = 600;

    // physical
    protected _pWidth:number = 25;
    protected _pHeight:number = 25;
    protected _verticalOffset:number = 273;
    protected _horisontalOffset:number = 288;

    public draw(ctx: CanvasRenderingContext2D) {
        const actorThis = this;
        function drawImageActualSize(this: any): any {
            const framePosition = data.frames[0];
            ctx?.drawImage(this,
                framePosition[0], framePosition[1], framePosition[2], framePosition[3],
                actorThis.realX, actorThis.realY, 600, 600
            );
        }
        this.image.src = sprite;
        this.image.onload = drawImageActualSize;
    }
}
