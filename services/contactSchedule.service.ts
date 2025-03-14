import apiService from "./api.service";
import type { AxiosResponse } from "axios";
import type { IContactSchedule } from "@/interfaces/IContactSchedule";

const getAll = (query = ""): Promise<AxiosResponse<IContactSchedule[]>> =>
  apiService.get(`/contact-schedules/${query}`);

const getById = (id: string): Promise<AxiosResponse<IContactSchedule>> =>
  apiService.get(`/contact-schedules/${id}/`);

export const contactScheduleService = {
  getAll,
  getById,
};
