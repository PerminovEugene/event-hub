import { WorldStorage } from '../world/storage'; 
import { GameActor } from '../world/gameActor';

let canvas: HTMLCanvasElement;
let offscreenCanvas: OffscreenCanvas;

export const render = (world: WorldStorage) => {
    canvas = canvas || document.getElementById('canvas');

    if (!offscreenCanvas) {
        offscreenCanvas = new OffscreenCanvas(canvas.width, canvas.height);
    }
    
    const ctx = offscreenCanvas.getContext('2d');

    world.dynamic.forEach((gameActor: GameActor) => {
        gameActor.draw(ctx);
    });

    const bitmapOne = offscreenCanvas.transferToImageBitmap();
    canvas.getContext("bitmaprenderer")?.transferFromImageBitmap(bitmapOne);
}