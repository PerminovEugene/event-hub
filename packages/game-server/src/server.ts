import { createServer } from "http";
import { Bus } from "./bus";
import { GameOrganizer } from "./gameOrganizer";
import { ServerTransport } from "./transport";

export class Server {
  private httpServer;

  public async create() {
    this.httpServer = createServer();
    const bus = new Bus();
    const transport = new ServerTransport(bus);
    transport.attachHandlers();
    const gameOrganizer = new GameOrganizer(bus);
    gameOrganizer.attachHanlders();
    transport.init(this.httpServer);
    this.httpServer.listen(8080);
  }
}
