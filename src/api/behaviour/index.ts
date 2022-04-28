import axios, { AxiosError, AxiosResponse } from "axios";
import {
  IBehaviour,
  IBehaviourCreatePayload,
  IBehaviourUpdatePayload,
} from "../../model";

export const fetchBehaviours = (): Promise<Array<IBehaviour>> => {
  return new Promise<Array<IBehaviour>>((resolve, reject) =>
    axios
      .get<Array<IBehaviour>>("/api/behaviours")
      .then((res: AxiosResponse) => res.data)
      .then((behaviours: Array<IBehaviour>) => resolve(behaviours))
      .catch((error: AxiosError) => reject(error))
  );
};

export const createBehaviour = (
  behaviour: IBehaviourCreatePayload
): Promise<IBehaviour> => {
  return new Promise<IBehaviour>((resolve, reject) =>
    axios
      .post<IBehaviour>("/api/behaviours", behaviour)
      .then((res: AxiosResponse) => res.data)
      .then((data: IBehaviour) => resolve(data))
      .catch((error: AxiosError) => reject(error))
  );
};

export const deleteBehaviour = (id: number): Promise<any> => {
  return new Promise<IBehaviour>((resolve, reject) =>
    axios
      .delete<IBehaviour>(`/api/behaviours/${id}`)
      .then((res: AxiosResponse) => res.data)
      .then((data: IBehaviour) => resolve(data))
      .catch((error: AxiosError) => reject(error))
  );
};

export const updateItem = (
  behaviour: IBehaviourUpdatePayload
): Promise<IBehaviour> => {
  return new Promise<IBehaviour>((resolve, reject) =>
    axios
      .put<IBehaviour>(`/api/behaviours/${behaviour.id}`, behaviour)
      .then((res: AxiosResponse) => res.data)
      .then((data: IBehaviour) => resolve(data))
      .catch((error: AxiosError) => reject(error))
  );
};
