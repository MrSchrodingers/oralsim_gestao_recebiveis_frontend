import { useEffect, useState } from "react";
import { notification } from "antd";
import { clinicService } from "@/services/clinic.service";
import type { IClinic } from "@/interfaces/IClinic";

interface UseClinicResponse {
  clinic: IClinic;
  clinicRefresh: () => void;
  clinicLoading: boolean;
}

export const useClinic = ({ clinic_id }: { clinic_id: string }): UseClinicResponse => {
  const [data, setData] = useState<IClinic>({} as IClinic);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    if (!clinic_id || isLoading) return;
    setIsLoading(true);

    clinicService
      .getById(clinic_id)
      .then((res) => {
        if (!res.data) {
          notification.error({
            message: "Clínica não encontrada",
          });
          return;
        }
        setData(res.data);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar clínica",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [clinic_id]);

  return {
    clinic: data,
    clinicRefresh: fetchData,
    clinicLoading: isLoading,
  };
};
