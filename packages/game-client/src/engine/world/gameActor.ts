export abstract class  GameActor {
    protected quant = 0;
    public maxQuant = 3; // MAKE PROTECTED
    protected throttleQuant = 0;
    protected throttleLevel = 10;

    constructor() {
        this._verticalBottomOffset = this.height - this.verticalOffset - this.pHeight;
        this._horisontalRightOffset = this.width - this.horisontalOffset - this.pWidth;
    }

    public tick() {
        this.throttleQuant += 1;
        if (this.throttleQuant === this.throttleLevel) {
            this.throttleQuant = 0;
            this.quant += 1;
            if (this.quant > this.maxQuant) {
                this.quant = 0;
            }
        }
    }
    public resetQuant = () => {
        this.quant = 0;
    }
   
    public realX: number = 0;
    public realY: number = 0;

    // for drawing
    protected _width: number = 0;
    protected _height: number = 0;

    // physical
    protected _pWidth:number = 0;
    protected _pHeight:number = 0;
    protected _verticalOffset:number = 0;
    protected _horisontalOffset:number = 0;
    protected _verticalBottomOffset: number = 0;
    protected _horisontalRightOffset: number = 0;

    abstract draw(ctx: any): any;

    get left() {
        return this.realX + this.horisontalOffset;
    }

    get right() {
        return this.realX + this.pWidth + this.horisontalOffset;
    }

    get top() {
        return this.realY + this.verticalOffset;
    }

    get bottom() {
        return this.realY + this.pHeight + this.verticalOffset;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get pWidth() {
        return this._pWidth;
    }

    get pHeight() {
        return this._pHeight;
    }

    get verticalOffset() {
        return this._verticalOffset;
    }

    get horisontalOffset() {
        return this._horisontalOffset;
    }

    get verticalBottomOffset() {
        return this._verticalBottomOffset;
    }

    get horisontalRightOffset() {
        return this._horisontalRightOffset;
    }
} 