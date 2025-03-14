import apiService from "./api.service";
import type { AxiosResponse } from "axios";
import type { IClinicPhone } from "@/interfaces/IClinicPhone";

const getAll = (query = ""): Promise<AxiosResponse<IClinicPhone[]>> =>
  apiService.get(`/clinic-phones/${query}`);

const getById = (id: string): Promise<AxiosResponse<IClinicPhone>> =>
  apiService.get(`/clinic-phones/${id}/`);

export const clinicPhoneService = {
  getAll,
  getById,
};
