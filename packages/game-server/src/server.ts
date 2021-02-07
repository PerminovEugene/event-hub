import { Flow } from "./flow";
import { createServer } from "http";
import { ServerSocketTransport } from "./transport";

export class Server {
  private httpServer;

  public async create() {
    this.httpServer = createServer();

    const transport = new ServerSocketTransport();
    const transport.init(this.httpServer);

    this.httpServer.listen(8080);
  }
}
