import { makeAutoObservable } from "mobx";
import { Building } from "../generalTypes/building";
import { ResourcesStore } from "./resources";

export class BuildingsStore {
  public buildings: Building[] = [];
  public availableBuildings: Building[] = [];

  constructor(private resourcesStore: ResourcesStore) {
    makeAutoObservable(this);
  }

  public initBuildings(buildings: Building[]) {
    buildings.forEach((buildings) => this.buildings.push(buildings));
  }

  public updateAvailableBuildings = () => {
    this.availableBuildings.push(
      ...this.buildings.filter((building) => {
        return this.resourcesStore.hasEnoughResources(building.price);
      })
    );
  };
}
