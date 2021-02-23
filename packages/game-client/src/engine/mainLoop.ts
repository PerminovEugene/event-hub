import { createWorldStorage, world } from './world/storage'
import { render } from './ui/render';
import { queue } from './queue';
import { MovementManager } from './physics/movement';
import { Transport } from './transport/socket';

let i = 0;
let j = 0;
export const setValue = (event: any) => {
    // const num = event.target.value;
    // states[curr][0] = num;
}

export const updateState = () => {
    while(!queue.isEmpty()) {
        const command = queue.take(); 
        command?.execute();
    }
}

const movementManager = new MovementManager();
const transport = new Transport();
transport.connect();
transport.attachHandlers();

export const main = (loadedData: any) => {
    createWorldStorage(loadedData);
    iterate();
}

const iterate = () => {
    window.requestAnimationFrame( main );
    // transport.sendUserEvents();
    // updateState();
    world.tick();
    // movementManager.updatePosition(world.dynamic, world.static);
    render(world);
    if (j === 10) {
        i++
        j = 0;
    }
    j++
    if (i === 3) {
        i = 0;
    }
}
