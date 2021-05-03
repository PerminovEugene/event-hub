import { Bus, RawPlayer } from "./bus";
import { Lobby } from "./lobby";
import { Player } from "./player";

export class GameOrganizer {
  constructor(private bus: Bus) {
    this.lobby = new Lobby(bus);
  }

  // TODO later it should array at least
  private lobby: Lobby;

  public attachHanlders() {
    this.bus.subscribeOnNewPlayers(this.onNewPlayerHandler);
    this.bus.subscribeOnPlayerDisconnect(this.onPlayerDisconnect);
  }

  private onNewPlayerHandler = (rawPlayer: RawPlayer) => {
    this.lobby.joinPlayer(new Player(rawPlayer));
    this.lobby.isFull() && this.lobby.startGameAfterDelay();
  };

  private onPlayerDisconnect = (userId: number) => {
    this.lobby.kickPlayer(userId);
  }
}
