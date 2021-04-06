import { makeAutoObservable } from "mobx";
import { Building } from "../generalTypes/building";

export class UIStore {
  public selectedGameObject: Building | null = null;
  public selectedGameObjectType: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public selectBuilding(building: Building) {
    this.selectedGameObject = building;
    this.selectedGameObjectType = "building";
  }

  public unselectBuilding() {
    this.selectedGameObject = null;
    this.selectedGameObjectType = null;
  }
}
