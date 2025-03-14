import apiService from "./api.service";
import type { AxiosResponse } from "axios";
import type { IPatientPhone } from "@/interfaces/IPatientPhone";

const getAll = (query = ""): Promise<AxiosResponse<IPatientPhone[]>> =>
  apiService.get(`/patient-phones/${query}`);

const getById = (id: string): Promise<AxiosResponse<IPatientPhone>> =>
  apiService.get(`/patient-phones/${id}/`);

export const patientPhoneService = {
  getAll,
  getById,
};
