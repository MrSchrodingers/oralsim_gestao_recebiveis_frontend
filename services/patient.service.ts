import apiService from "./api.service";
import type { AxiosResponse } from "axios";
import type { IPatient } from "@/interfaces/IPatient";
import type { IPatientData } from "@/interfaces/IPatientData";

const getAll = (query = ""): Promise<AxiosResponse<IPatient[]>> =>
  apiService.get(`/patients/${query}`);

const getById = (id: string): Promise<AxiosResponse<IPatient>> =>
  apiService.get(`/patients/${id}/`);

const listPatientData = (): Promise<AxiosResponse<IPatientData[]>> =>
  apiService.get('/patients-data/');

export const patientService = {
  getAll,
  getById,
  listPatientData
};
