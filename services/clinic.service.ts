import apiService from "./api.service";
import type { AxiosResponse } from "axios";
import type { IClinic } from "@/interfaces/IClinic";

const getAll = (query = ""): Promise<AxiosResponse<IClinic[]>> =>
  apiService.get(`/clinics/${query}`);

const getById = (id: string): Promise<AxiosResponse<IClinic>> =>
  apiService.get(`/clinics/${id}/`);

export const clinicService = {
  getAll,
  getById,
};
