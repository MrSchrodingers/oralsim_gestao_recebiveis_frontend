import { useEffect, useState } from "react";
import { notification } from "antd";
import { contactScheduleService } from "@/services/contactSchedule.service";
import type { IContactSchedule } from "@/interfaces/IContactSchedule";

interface UseContactScheduleResponse {
  contactSchedule: IContactSchedule;
  contactScheduleRefresh: () => void;
  contactScheduleLoading: boolean;
}

export const useContactSchedule = ({
  contact_schedule_id,
}: {
  contact_schedule_id: string;
}): UseContactScheduleResponse => {
  const [data, setData] = useState<IContactSchedule>({} as IContactSchedule);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    if (!contact_schedule_id || isLoading) return;
    setIsLoading(true);

    contactScheduleService
      .getById(contact_schedule_id)
      .then((res) => {
        if (!res.data) {
          notification.error({
            message: "Agendamento de contato não encontrado",
          });
          return;
        }
        setData(res.data);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar agendamento de contato",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [contact_schedule_id]);

  return {
    contactSchedule: data,
    contactScheduleRefresh: fetchData,
    contactScheduleLoading: isLoading,
  };
};
