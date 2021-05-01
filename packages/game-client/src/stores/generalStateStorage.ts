import { makeAutoObservable } from "mobx";
import { Resource, ResourceId } from "../generalTypes/resource";

export class GeneralStateStorage {
  public activeState: { [key in ResourceId]: Resource } = {};

  constructor() {
    makeAutoObservable(this);
  }

  public playFastGame() {}
}
