import { Price } from "./resource";

type Id = number;

export type Building = {
  id: Id;
  name: string;
  description: string;
  price: Price;
};
