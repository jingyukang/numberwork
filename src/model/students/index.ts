import { IBehaviourScored } from "..";

export interface IStudent {
  id: number;
  studentName: string;
  age: number;
  scores: Array<IBehaviourScored>;
  average: number;
  statistics: Array<number>;
}

export interface IStudnetCreatePayload {
  studentName: string;
  age: number;
}

export interface IStudentUpdatePayload {
  id?: number;
  studentName?: string;
  age?: number;
  scores?: Array<IBehaviourScored>;
  average?: number;
  statistics?: Array<number>;
}
