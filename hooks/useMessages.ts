import { useEffect, useState } from "react";
import { notification } from "antd";
import { messageService } from "@/services/message.service";
import type { IMessage } from "@/interfaces/IMessage";

interface UseMessagesResponse {
  messages: IMessage[];
  messagesTotal: number;
  messagesRefresh: () => void;
  messagesLoading: boolean;
}

export const useMessages = (): UseMessagesResponse => {
  const [data, setData] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    messageService
      .getAll()
      .then((res) => {
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar mensagens",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    messages: data,
    messagesTotal: total,
    messagesRefresh: fetchData,
    messagesLoading: isLoading,
  };
};
