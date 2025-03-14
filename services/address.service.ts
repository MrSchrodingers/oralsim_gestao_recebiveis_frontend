import apiService from "./api.service";
import type { AxiosResponse } from "axios";
import type { IAddress } from "@/interfaces/IAddress";

const getAll = (query = ""): Promise<AxiosResponse<IAddress[]>> =>
  apiService.get(`/addresses/${query}`);

const getById = (id: string): Promise<AxiosResponse<IAddress>> =>
  apiService.get(`/addresses/${id}/`);

export const addressService = {
  getAll,
  getById,
};
