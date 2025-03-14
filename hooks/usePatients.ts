import { useEffect, useState } from "react";
import { notification } from "antd";
import { patientService } from "@/services/patient.service";
import type { IPatient } from "@/interfaces/IPatient";

interface UsePatientsResponse {
  patients: IPatient[];
  patientsTotal: number;
  patientsRefresh: () => void;
  patientsLoading: boolean;
}

export const usePatients = (): UsePatientsResponse => {
  const [data, setData] = useState<IPatient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    patientService
      .getAll()
      .then((res) => {
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar pacientes",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    patients: data,
    patientsTotal: total,
    patientsRefresh: fetchData,
    patientsLoading: isLoading,
  };
};
