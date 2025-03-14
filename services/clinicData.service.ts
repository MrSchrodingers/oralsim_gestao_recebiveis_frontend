import apiService from "./api.service";
import type { AxiosResponse } from "axios";
import type { IClinicData } from "@/interfaces/IClinicData";

const getAll = (query = ""): Promise<AxiosResponse<IClinicData[]>> =>
  apiService.get(`/clinics-data/${query}`);

const getById = (id: string): Promise<AxiosResponse<IClinicData>> =>
  apiService.get(`/clinics-data/${id}/`);

export const clinicDataService = {
  getAll,
  getById,
};
