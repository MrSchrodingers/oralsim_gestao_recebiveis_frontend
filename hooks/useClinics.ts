import { useEffect, useState } from "react";
import { notification } from "antd";
import { clinicService } from "@/services/clinic.service";
import type { IClinic } from "@/interfaces/IClinic";

interface UseClinicsResponse {
  clinics: IClinic[];
  clinicsTotal: number;
  clinicsRefresh: () => void;
  clinicsLoading: boolean;
}

export const useClinics = (): UseClinicsResponse => {
  const [data, setData] = useState<IClinic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    clinicService
      .getAll()
      .then((res) => {
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar clínicas",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    clinics: data,
    clinicsTotal: total,
    clinicsRefresh: fetchData,
    clinicsLoading: isLoading,
  };
};
