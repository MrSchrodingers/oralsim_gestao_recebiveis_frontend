import { useEffect, useState } from "react";
import { notification } from "antd";
import { clinicDataService } from "@/services/clinicData.service";
import type { IClinicData } from "@/interfaces/IClinicData";

interface UseClinicDataResponse {
  clinicData: IClinicData;
  clinicDataRefresh: () => void;
  clinicDataLoading: boolean;
}

export const useClinicData = ({ clinic_data_id }: { clinic_data_id: string }): UseClinicDataResponse => {
  const [data, setData] = useState<IClinicData>({} as IClinicData);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    if (!clinic_data_id || isLoading) return;
    setIsLoading(true);

    clinicDataService
      .getById(clinic_data_id)
      .then((res) => {
        if (!res.data) {
          notification.error({
            message: "Dados de clínica não encontrados",
          });
          return;
        }
        setData(res.data);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar dados de clínica",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [clinic_data_id]);

  return {
    clinicData: data,
    clinicDataRefresh: fetchData,
    clinicDataLoading: isLoading,
  };
};
