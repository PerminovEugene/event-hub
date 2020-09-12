export abstract class  GameActor {
    protected view: any;
    protected logic: any;

    protected quant = 0;
    protected maxQuant = 2;
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

    public draw(ctx: any): any {};
} 