import transport from "../transport";
import { BuildingsStore } from "./buidings";
import { ResourcesStore } from "./resources";
import { UIStore } from "./uiStore";
import { GeneralStateStorage } from "./generalStateStorage";

/**
 * Root Store Class with
 */
export class RootStore {
  public buildingsStore: BuildingsStore;
  public resourceStore: ResourcesStore;
  public uiStore: UIStore;
  public generalStateStorage: GeneralStateStorage;

  constructor() {
    this.resourceStore = new ResourcesStore();
    this.buildingsStore = new BuildingsStore(this.resourceStore);
    this.uiStore = new UIStore();
    this.generalStateStorage = new GeneralStateStorage();
  }

  public async init() {
    const initialState = await transport.connect().getInitalState();
    this.resourceStore.initResources(initialState.resources);
    this.buildingsStore.initBuildings(initialState.buildings);
    this.buildingsStore.updateAvailableBuildings();
  }
}
