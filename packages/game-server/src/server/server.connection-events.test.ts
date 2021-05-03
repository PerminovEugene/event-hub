import { assert } from "chai";
import { Server } from './server';
import { eventsMap } from "../../../shared/dist";
import { checkClientHandlersSequence, createClientAndConnect } from './testUtils';

describe("Server clients connection and adding to lobby", () => {
  let server: Server, port: number;

  before((done) => {
    server = new Server();
    server.create()
      .then(() => {
        const address = server.getAddress();
        port = typeof address === 'object' ? address.port : 8080;
        done();
      });
  });

  after(() => {
    server.close();
  });

  it("Should join first client to the empty lobby and send him lobby info",
    async () => {
      const client = await createClientAndConnect(port);

      await checkClientHandlersSequence([
        {
          client,
          handler: eventsMap.lobbyInfoUpdated.handler,
          assertFunction: (lobbyPublicData) => {
            assert.equal(lobbyPublicData.size, 2);
            assert.equal(lobbyPublicData.players.length, 1);
            assert.equal(lobbyPublicData.players[0].id, 1);
          }
        },
      ]);
      client.disconnect();
    }
  );

  // TODO lobby size > configurable server creation;
  it("Should join second client to lobby with player and send them lobby info and player joined event",
    async () => {
      const client1 = await createClientAndConnect(port);
      const client2 = await createClientAndConnect(port);

      await checkClientHandlersSequence([
        {
          client: client1,
          handler: eventsMap.playerJoinRoom.handler,
          assertFunction: (playerPublicData) => {
            assert.equal(playerPublicData.id, 3);
          }
        },
        {
          client: client2,
          handler: eventsMap.lobbyInfoUpdated.handler,
          assertFunction: (lobbyPublicData) => {
            assert.equal(lobbyPublicData.size, 2);
            assert.equal(lobbyPublicData.players.length, 2);
            assert.equal(lobbyPublicData.players[0].id, 2);
            assert.equal(lobbyPublicData.players[1].id, 3);
          }
        },
      ]);

      client1.disconnect();
      client2.disconnect();
    }
  );
});