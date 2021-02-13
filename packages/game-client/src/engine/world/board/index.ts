const size = 19 * 2 + 1;

export class BoardItem {}

export class Crossroad extends BoardItem {

}

export class Square extends BoardItem {

}


export class Board {
    private matrix: BoardItem[][] = new Array(size);
    
    constructor() {
        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i] = new Array(size);
            for (let j = 0; j < this.matrix.length - 1; j = j + 2 ) {
                this.matrix[i][j] = new Square();
            }
            for (let j = 1; j < this.matrix.length; j = j + 2 ) {
                this.matrix[i][j] = new Crossroad();
            }
        }
    }
}