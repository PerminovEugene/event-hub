import { GameEngine } from './gameEngine';

class GameEngineFactory {
    public createEngine() {
        return new GameEngine();
    }
}

const gameEngineFactory = new GameEngineFactory();

gameEngineFactory.createEngine();