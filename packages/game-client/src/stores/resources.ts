import { makeAutoObservable } from "mobx";
import {
  Price,
  Quantity,
  Resource,
  ResourceCheck,
  ResourceId,
} from "../generalTypes/resource";

export class ResourcesStore {
  public resources: { [key in ResourceId]: Resource } = {};

  constructor() {
    makeAutoObservable(this);
  }

  public initResources(resources: Resource[]) {
    resources.forEach((resource) => (this.resources[resource.id] = resource));
  }

  public updateResourceQuantity(resourceId: ResourceId, newQuantity: Quantity) {
    this.resources[resourceId].quantity = newQuantity;
  }

  public hasEnoughResources(price: Price): ResourceCheck {
    for (const [resourceId, quantity] of Object.entries(price)) {
      const id = parseInt(resourceId);
      if (this.resources[id].quantity < quantity) {
        return {
          enough: false,
          limits: {
            resourceId: id,
            missingQuantity: quantity - this.resources[id].quantity,
          },
        };
      }
    }
    return { enough: true };
  }
}
