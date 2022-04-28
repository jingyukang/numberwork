export interface IBehaviour {
  id: number;
  behaviour: string;
}
export interface IBehaviourCreatePayload {
  behaviour: string;
}

export interface IBehaviourScored {
  id: number;
  behaviour: string;
  score: number;
}

export interface IBehaviourUpdatePayload {
  id: number;
  behaviour?: string;
}
