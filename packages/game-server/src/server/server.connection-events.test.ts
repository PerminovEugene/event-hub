import { assert } from "chai";
import { Server } from './server';
import { eventsMap } from "../../../shared/dist";
import { checkClientHandlersSequence, createClientAndConnect, launchClient } from './testUtils';

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
      const id = 1;
      const client = await createClientAndConnect(port, id);
      launchClient(client);

      await checkClientHandlersSequence([
        {
          client,
          handler: eventsMap.lobbyInfoUpdated.handler,
          assertFunction: (lobbyPublicData) => {
            assert.equal(lobbyPublicData.size, 2);
            assert.equal(lobbyPublicData.players.length, 1);
            assert.equal(lobbyPublicData.players[0].id, id);
          }
        },
      ]);
      client.disconnect();
    }
  );

  // TODO lobby size > configurable server creation;
  it("Should join first client and then second client to lobby. Clients should receive correct events",
    async () => {
      const id1 = 1;
      const id2 = 2;
      const client1 = await createClientAndConnect(port, id1);
      const client2 = await createClientAndConnect(port, id2);

      launchClient(client1);

      await checkClientHandlersSequence([
        {
          client: client1,
          handler: eventsMap.lobbyInfoUpdated.handler,
          assertFunction: (lobbyPublicData) => {
            assert.equal(lobbyPublicData.size, 2);
            assert.equal(lobbyPublicData.players.length, 1);
            assert.equal(lobbyPublicData.players[0].id, id1);
            client2.emit('ready');
          }
        },
        {
          client: client1,
          handler: eventsMap.playerJoinRoom.handler,
          assertFunction: (playerPublicData) => {
            assert.equal(playerPublicData.id, id2);
          }
        },
        {
          client: client2,
          handler: eventsMap.lobbyInfoUpdated.handler,
          assertFunction: (lobbyPublicData) => {
            assert.equal(lobbyPublicData.size, 2);
            assert.equal(lobbyPublicData.players.length, 2);
            assert.equal(lobbyPublicData.players[0].id, id1);
            assert.equal(lobbyPublicData.players[1].id, id2);
          }
        },
      ]);
      
      client1.disconnect();
      client2.disconnect();
    }
  );
});