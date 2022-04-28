import { IBehaviour } from "..";

export interface IStudent {
  id: number;
  studentName: string;
  age: number;
  scores: Array<IBehaviour>;
  average: number;
  statistics: Array<number>;
}

export interface ICreateStudnet {
  studentName: string;
  age: number;
}
