import type { IUser, IUserCreated } from "@/interfaces/IUser";
import apiService from "./api.service";
import type { AxiosResponse } from "axios";
import type { ILogin, ILoginResponse } from "@/interfaces/ILogin";

const create = async (data: IUserCreated): Promise<AxiosResponse<IUser>> =>
  apiService.post("/users/", data);

const update = async (id: string, data: IUserCreated): Promise<AxiosResponse<IUser>> =>
  apiService.put(`/users/${id}/`, data);

const remove = async (id: string): Promise<AxiosResponse<IUser>> =>
  apiService.delete(`/users/${id}/`);

const getAll = async (query: string = ""): Promise<AxiosResponse<IUser[]>> =>
  apiService.get("/users/" + query);

const getById = async (id: string): Promise<AxiosResponse<IUser>> =>
  apiService.get(`/users/${id}/`);


const login = (data: ILogin): Promise<AxiosResponse<ILoginResponse>> =>
  apiService.post("/login/", data);


const getUser = (): Promise<AxiosResponse<IUser>> =>
  apiService.get("/users/me/");

export const userService = {
  create,
  update,
  remove,
  getAll,
  getById,
  login,
  getUser,
};
