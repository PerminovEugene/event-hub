import { world } from './world/storage'
import { render } from './ui/render';
import { queue } from './queue';

let i = 0;
let j = 0;
const states = [
    [10, 100, 28, 40],
    [36, 100, 28, 40],
    [62, 100, 28, 40],
]
let curr = 2;
export const setValue = (event: any) => {
    const num = event.target.value;
    states[curr][0] = num;
}


export const updateState = () => {
    while(!queue.isEmpty()) {
        const command = queue.take(); 
        command?.execute();
    }
}

export const  main = () => {
    window.requestAnimationFrame( main );
    updateState();
    world.tick();
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
