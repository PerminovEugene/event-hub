import { GameState } from "./gameState";
import { LoadingState } from "./loadState";
import { State } from "./state";

export class Automate {
    private state: State | null = null;
    private stateDB: any;

    public async start() {
        if (!this.state) {
            this.state = new LoadingState();
        }
        this.stateDB = await this.state.start();
        await this.toNext();
    }

    public async toNext() {
        // TODO make smarter
        this.state = new GameState();
        await this.state.start(this.stateDB);
    }
}