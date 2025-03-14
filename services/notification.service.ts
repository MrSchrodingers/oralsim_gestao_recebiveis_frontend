import type { INotification, INotificationResponse } from "@/interfaces/INotification";
import apiService from "./api.service";
import type { AxiosResponse } from "axios";

const sendSms = (data: INotification): Promise<AxiosResponse<INotificationResponse>> =>
  apiService.post("/sms/send/", data);

const sendEmail = (data: INotification): Promise<AxiosResponse<INotificationResponse>> =>
  apiService.post("/email/send/", data);

const sendWhatsapp = (data: INotification): Promise<AxiosResponse<INotificationResponse>> =>
  apiService.post("/whatsapp/send/", data);

export const notificationService = {
  sendSms,
  sendEmail,
  sendWhatsapp,
};
