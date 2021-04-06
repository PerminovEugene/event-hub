import transport from "../transport";
import { BuildingsStore } from "./buidings";
import { ResourcesStore } from "./resources";
import { UIStore } from "./uiStore";

/**
 * Root Store Class with
 */
export class RootStore {
  public buildingsStore: BuildingsStore;
  public resourceStore: ResourcesStore;
  public uiStore: UIStore;

  constructor() {
    this.resourceStore = new ResourcesStore();
    this.buildingsStore = new BuildingsStore(this.resourceStore);
    this.uiStore = new UIStore();
  }

  public async init() {
    const initialState = await transport.connect().getInitalState();
    this.resourceStore.initResources(initialState.resources);
    this.buildingsStore.initBuildings(initialState.buildings);
    this.buildingsStore.updateAvailableBuildings();
  }
}
