export abstract class  GameActor {
    protected quant = 0;
    protected maxQuant = 3;
    protected throttleQuant = 0;
    protected throttleLevel = 10;
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

    abstract draw(ctx: any): any;
} 