import { Bus } from "./bus";
import { Player } from "./player";

const FIVE_SECONDS = 5_000;

type LobbyConfig = {
  size: number;
  delayBeforeStartingGame: number;
};

export class Lobby {
  private players: Player[] = [];
  private roomId: string = "fake id";
  private gameStartingTimer: NodeJS.Timeout;

  constructor(
    private bus: Bus,
    private lobbyConfig: LobbyConfig = {
      size: 2,
      delayBeforeStartingGame: FIVE_SECONDS,
    }
  ) {}

  public joinPlayer(player: Player) {
    if (!this.isFull()) {
      if (this.players.length) {
        this.bus.broadcastToRoomPlayerJoined(
          this.roomId,
          player.getPublicPlayerData()
        );
      }
      this.players.push(player);
      player.joinRoom(this.roomId);
      player.sendLobbyInfo({
        players: this.players.map((player) => player.getPublicPlayerData()),
        size: this.lobbyConfig.size,
      });
    } else {
      throw new Error("Lobby is full");
    }
  }

  public kickPlayer = (userId: number) => {
    this.players = this.players.filter((player) => player.getPublicPlayerData().id !== userId);
    // TODO this.bus.send
    clearTimeout(this.gameStartingTimer);
  }

  public isFull() {
    return this.players.length >= this.lobbyConfig.size;
  }

  public startGameAfterDelay() {
    this.bus.broadcastToRoomStartGameAfterDelay(this.roomId);
    // TODO if someone left lobby need to clean timer
    this.gameStartingTimer = setTimeout(() => {
      this.bus.broadcastToRoomStartGame(this.roomId);
    }, this.lobbyConfig.delayBeforeStartingGame);
  }
}
