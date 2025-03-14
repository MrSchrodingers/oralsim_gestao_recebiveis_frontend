import apiService from "./api.service";
import type { AxiosResponse } from "axios";

// Substitua pelos tipos corretos
import type { IMessage } from "@/interfaces/IMessage";

const getAll = (query = ""): Promise<AxiosResponse<IMessage[]>> =>
  apiService.get(`/messages/${query}`);

const getById = (id: string): Promise<AxiosResponse<IMessage>> =>
  apiService.get(`/messages/${id}/`);

export const messageService = {
  getAll,
  getById,
};
