import { useEffect, useState } from "react";
import { notification } from "antd";
import { clinicDataService } from "@/services/clinicData.service";
import type { IClinicData } from "@/interfaces/IClinicData";

interface UseClinicsDataResponse {
  clinicsData: IClinicData[];
  clinicsDataTotal: number;
  clinicsDataRefresh: () => void;
  clinicsDataLoading: boolean;
}

export const useClinicsData = (): UseClinicsDataResponse => {
  const [data, setData] = useState<IClinicData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    clinicDataService
      .getAll()
      .then((res) => {
        setData(res.data);
        setTotal(res.data.length);
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
  }, []);

  return {
    clinicsData: data,
    clinicsDataTotal: total,
    clinicsDataRefresh: fetchData,
    clinicsDataLoading: isLoading,
  };
};
