export type RepeatFunction = () => Promise<void>; 
export type GameLoopConfig = {
    // function for call next iterate. Window.request animation frame for browser
    readonly repeatFunction: (repeatFunction: RepeatFunction) => Promise<void>;
    // function with all actions for each iteration
    readonly iterate: () => Promise<void>
}

export class GameLoop {
    private _onPause = false;
    private _config: GameLoopConfig;

    public init(config: GameLoopConfig) {
        this._config = config;
    }

    public start() {
        this._onPause = false;
        this._config.repeatFunction(this.iterate)
    }

    public stop() {
        this._onPause = true;
    }

    private iterate = async () => {
        if (this.continueLoop()) {
            this._config.iterate()
        }  
    }

    private continueLoop = () => !this._onPause;
}