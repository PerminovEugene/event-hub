import { Building } from "../generalTypes/building";
import { Resource } from "../generalTypes/resource";

type InitialState = {
  resources: Resource[];
  buildings: Building[];
};

export class Transport {
  public connect() {
    // TODO
    return this;
  }

  public async getInitalState(): Promise<InitialState> {
    return {
      //   availableBuildings: [],
      //   availableUnits: [],
      //   availableImprovents: [],
      resources: [
        {
          name: "Gold",
          id: 1,
          description: "Yellow evil",
          quantity: 5,
        },
      ],
      buildings: [
        {
          id: 1,
          description: "Farm",
          name: "Farm",
          price: {
            [1]: 3, // 1 is id of resource, 3 is a cost
          },
          physicalParameters: {
            width: 2,
            height: 2,
            defaultShape: [
              [1, 1],
              [1, 1],
            ],
          },
        },
      ],
      //   units: [],
      //   mapInfo: [],
    };
  }
}

export default new Transport();
