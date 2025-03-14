import { useEffect, useState } from "react";
import { notification } from "antd";
import { clinicPhoneService } from "@/services/clinicPhone.service";
import type { IClinicPhone } from "@/interfaces/IClinicPhone";

interface UseClinicPhonesResponse {
  clinicPhones: IClinicPhone[];
  clinicPhonesTotal: number;
  clinicPhonesRefresh: () => void;
  clinicPhonesLoading: boolean;
}

export const useClinicPhones = (): UseClinicPhonesResponse => {
  const [data, setData] = useState<IClinicPhone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    clinicPhoneService
      .getAll()
      .then((res) => {
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar telefones de clínica",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    clinicPhones: data,
    clinicPhonesTotal: total,
    clinicPhonesRefresh: fetchData,
    clinicPhonesLoading: isLoading,
  };
};
