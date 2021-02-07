import { main } from '../engine/mainLoop';
import { State } from './state';

export class GameState implements State {
    public async start(loadedData: any) {
        main(loadedData);
    }
}