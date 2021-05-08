import { Bus, RawPlayer } from "./bus";
import { Lobby, LobbyId } from "./lobby";
import { Player } from "./player";

export class GameOrganizer {
  private lobbies: {[key in LobbyId]: Lobby} = {};

  constructor(private bus: Bus) {}

  private createLobby() {
    const lobby = new Lobby(this.bus);
    this.lobbies[lobby.id] = lobby;
    return lobby;
  }
  private deleteLobby(id: LobbyId) {
    delete this.lobbies[id];
  }

  public attachHanlders() {
    this.bus.subscribeOnNewPlayers(this.onNewPlayerHandler);
    this.bus.subscribeOnPlayerDisconnect(this.onPlayerDisconnect);
  }

  private onNewPlayerHandler = (rawPlayer: RawPlayer) => {
    let availableLobby: Lobby = this.selectNotFullLobby();
    if (!availableLobby) {
      availableLobby = this.createLobby();
    }
    rawPlayer.socket.lobbyId = availableLobby.id;
    availableLobby.joinPlayer(new Player(rawPlayer, availableLobby.id));
    availableLobby.isFull() && availableLobby.startGameAfterDelay();
  };

  private selectNotFullLobby = (): Lobby | undefined => {
    return Object.values(this.lobbies).find(({ isFull }) => !isFull())
  }

  private onPlayerDisconnect = ({ lobbyId, userId }: { lobbyId: string, userId: number }) => {
    this.lobbies[lobbyId].kickPlayer(userId);
  }
}
