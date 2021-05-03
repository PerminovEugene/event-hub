import { createServer, Server as HTTPServer } from "http";
import { Bus } from "../bus";
import { GameOrganizer } from "../gameOrganizer";
import { ServerTransport } from "../transport";

export class Server {
  private httpServer: HTTPServer;
  private transport: ServerTransport;
  private bus: Bus;

  public create(): Promise<Server> {
    return new Promise((resolve, reject) => {
      try {
        this.httpServer = createServer();
        this.bus = new Bus();
        this.transport = new ServerTransport(this.bus);
        this.transport.attachHandlers();
        const gameOrganizer = new GameOrganizer(this.bus);
        gameOrganizer.attachHanlders();
        this.transport.init(this.httpServer);
        this.httpServer.listen(8080, () => {
          resolve(this);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  public getAddress() {
    return this.httpServer.address();
  }

  public close() {
    this.bus.destroy();
    this.transport.destory();
    this.httpServer.close();
    this.httpServer = null;
    this.transport = null;
  }
}
