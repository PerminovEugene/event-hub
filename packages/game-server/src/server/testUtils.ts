import Client from "socket.io-client";
import { assert } from "chai";

export const createClientAndConnect = async (port: number): Promise<SocketIOClient.Socket> => {
  return new Promise((resolve, reject) => {
    const clientSocket = Client(`http://localhost:${port}`);
    clientSocket.on("connect", 
      () => {
        resolve(clientSocket);
      }
    );
    clientSocket.on("disconnect", 
      () => {
        // console.log('disconnected');
      }
    );
  });
};

type SequenceItem = {
  client: SocketIOClient.Socket,
  assertFunction: (...p: any) => void,
  handler: (callback: any) => [string, any],
}
export const checkClientHandlersSequence = async (
  sequence: SequenceItem[]
) => {
  let currentCallback = 0;
  
  const handleItem = (sequenceItem: SequenceItem, index: number): Promise<void> => {
    const { client, assertFunction, handler } = sequenceItem;
    return new Promise((res, rej) => {
      const [eventName, callback] = handler(assertFunction);
      const timer = setTimeout(() => {
        rej('Timeout is happend')
      }, 15_000);

      const callbackWrapper = (...rest: any[]) => {
        try {
          currentCallback += 1;
          callback(...rest);
          res();
        } catch (e) {
          rej(e);
        } finally {
          clearTimeout(timer);
        }
      }
      client.on(eventName, callbackWrapper);
    });
  };

  return Promise.all(
    sequence.map((sequenceItem, index) => handleItem(sequenceItem, index))
  );
}
  
