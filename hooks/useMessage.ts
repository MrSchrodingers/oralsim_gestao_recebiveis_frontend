import { useEffect, useState } from "react";
import { notification } from "antd";
import { messageService } from "@/services/message.service";
import type { IMessage } from "@/interfaces/IMessage";

interface UseMessageResponse {
  message: IMessage;
  messageRefresh: () => void;
  messageLoading: boolean;
}

export const useMessage = ({ message_id }: { message_id: string }): UseMessageResponse => {
  const [data, setData] = useState<IMessage>({} as IMessage);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    if (!message_id || isLoading) return;
    setIsLoading(true);

    messageService
      .getById(message_id)
      .then((res) => {
        if (!res.data) {
          notification.error({
            message: "Mensagem não encontrada",
          });
          return;
        }
        setData(res.data);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar mensagem",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [message_id]);

  return {
    message: data,
    messageRefresh: fetchData,
    messageLoading: isLoading,
  };
};
