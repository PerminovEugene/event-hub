import { Price } from "./resource";

type Id = number;
type ShapeMapItem = 0 | 1;

export type Building = {
  id: Id;
  name: string;
  description: string;
  price: Price;
  physicalParameters: {
    width: number;
    height: number;
    defaultShape: ShapeMapItem[][];
  };
};
