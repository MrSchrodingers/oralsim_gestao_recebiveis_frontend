import { useEffect, useState } from "react";
import { notification } from "antd";
import { patientPhoneService } from "@/services/patientPhone.service";
import type { IPatientPhone } from "@/interfaces/IPatientPhone";

interface UsePatientPhonesResponse {
  patientPhones: IPatientPhone[];
  patientPhonesTotal: number;
  patientPhonesRefresh: () => void;
  patientPhonesLoading: boolean;
}

export const usePatientPhones = (): UsePatientPhonesResponse => {
  const [data, setData] = useState<IPatientPhone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    patientPhoneService
      .getAll()
      .then((res) => {
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar telefones de paciente",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    patientPhones: data,
    patientPhonesTotal: total,
    patientPhonesRefresh: fetchData,
    patientPhonesLoading: isLoading,
  };
};
