export type ResourceName = string;
export type Quantity = number;
export type ResourceId = number;
export type Price = { [key in ResourceId]: Quantity };

export interface Resource {
  id: ResourceId;
  name: ResourceName;
  description: string;
  quantity: Quantity;
}

export type ResourceCheck = {
  enough: boolean;
  limits?: {
    resourceId: ResourceId;
    missingQuantity: Quantity;
  };
};
