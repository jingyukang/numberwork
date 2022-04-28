import { IBehaviour } from "..";

export interface IStudent {
  id: number;
  name: string;
  scores: Array<IBehaviour>;
  average: number;
  statistics: Array<number>;
}
