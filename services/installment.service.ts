import apiService from "./api.service";
import type { AxiosResponse } from "axios";
import type { IInstallment } from "@/interfaces/IInstallment";

const getAll = (query = ""): Promise<AxiosResponse<IInstallment[]>> =>
  apiService.get(`/installments/${query}`);

const getById = (id: string): Promise<AxiosResponse<IInstallment>> =>
  apiService.get(`/installments/${id}/`);

export const installmentService = {
  getAll,
  getById,
};
