import { useState } from "react";
import { notification } from "antd";
import { notificationService } from "@/services/notification.service";
import type { INotification } from "@/interfaces/INotification";

type NotificationMethod = "sms" | "email" | "whatsapp";

export const useSendNotification = () => {
  const [loading, setLoading] = useState(false);

  const sendNotification = async (
    data: INotification,
    notificationMethod: NotificationMethod
  ) => {
    try {
      setLoading(true);

      switch (notificationMethod) {
        case "sms":
          await notificationService.sendSms(data);
          break;
        case "email":
          await notificationService.sendEmail(data);
          break;
        case "whatsapp":
          await notificationService.sendWhatsapp(data);
          break;
      }

      notification.success({
        message: "Notificação enviada com sucesso!",
      });
    } catch (error) {
      notification.error({
        message: "Erro ao enviar notificação!",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendNotification };
};
