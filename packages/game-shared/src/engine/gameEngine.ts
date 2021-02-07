import { GameLoop } from "./mainLoop";
import { Transport } from "../transport/transport";
import { World } from "./world/world";

export abstract class GameEngine {
  constructor(
    private gameLoop: GameLoop,
    private transport: Transport,
    private world: World
  ) {}

  abstract repeatFunction = async () => {};
  abstract iterate = async () => {};

  public async init() {
    await this.world.generate();
    this.gameLoop.init({
      repeatFunction: this.repeatFunction,
      iterate: this.iterate,
    });
    this.gameLoop.start();
  }
}
