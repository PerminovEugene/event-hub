import { WorldStorage } from '../world/storage'; 
import { GameActor } from '../world/gameActor';

let canvas: HTMLCanvasElement;

export const render = (world: WorldStorage) => {
    canvas = canvas || document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas!.getContext('2d');
    world.dynamic.forEach((gameActor: GameActor) => {
        gameActor.draw(ctx);
    });
    // // var image = new Image(100, 100);
    // // image.onload = drawImageActualSize;
    // // image.src = 'Adventure%20time%20RPG_%20Jake%20the%20dog%20overworld%20by%20tebited15%20on%20DeviantArt.png'

    // function drawImageActualSize(this: any) {
    //   canvas.width = this.naturalWidth;
    //   canvas.height = this.naturalHeight;
    
    //   const a = states[i];
    //     ctx?.drawImage(this,
    //         a[0], a[1], a[2], a[3],
    //         100, 100, 28, 40
    //     );
    // }
}