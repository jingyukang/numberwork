import axios, { AxiosError, AxiosResponse } from "axios";
import {
  IStudent,
  IStudnetCreatePayload,
  IStudentUpdatePayload,
} from "../../model";

export const fetchStudents = (): Promise<Array<IStudent>> => {
  return new Promise<Array<IStudent>>((resolve, reject) =>
    axios
      .get<Array<IStudent>>("/api/students")
      .then((res: AxiosResponse) => res.data)
      .then((students: Array<IStudent>) => resolve(students))
      .catch((error: AxiosError) => reject(error))
  );
};

export const createStudent = (
  student: IStudnetCreatePayload
): Promise<IStudent> => {
  return new Promise<IStudent>((resolve, reject) =>
    axios
      .post<IStudent>("/api/students", student)
      .then((res: AxiosResponse) => res.data)
      .then((data: IStudent) => resolve(data))
      .catch((error: AxiosError) => reject(error))
  );
};

export const deleteStudent = (id: number): Promise<any> => {
  return new Promise<IStudent>((resolve, reject) =>
    axios
      .delete<IStudent>(`/api/students/${id}`)
      .then((res: AxiosResponse) => res.data)
      .then((data: IStudent) => resolve(data))
      .catch((error: AxiosError) => reject(error))
  );
};

export const updateStudent = (
  student: IStudentUpdatePayload
): Promise<IStudent> => {
  return new Promise<IStudent>((resolve, reject) =>
    axios
      .put<IStudent>(`/api/students/${student.id}`, student)
      .then((res: AxiosResponse) => res.data)
      .then((data: IStudent) => resolve(data))
      .catch((error: AxiosError) => reject(error))
  );
};
