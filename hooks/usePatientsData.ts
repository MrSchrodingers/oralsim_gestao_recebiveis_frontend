import { useEffect, useState } from "react";
import { notification } from "antd";
import { patientService } from "@/services/patient.service";
import type { IPatientData } from "@/interfaces/IPatientData";

interface UsePatientsDataResponse {
  patientsData: IPatientData[];
  patientsDataTotal: number;
  patientsDataRefresh: () => void;
  patientsDataLoading: boolean;
}

export const usePatientsData = (): UsePatientsDataResponse => {
  const [data, setData] = useState<IPatientData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    patientService
      .listPatientData()
      .then((res) => {
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar dados de pacientes",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    patientsData: data,
    patientsDataTotal: total,
    patientsDataRefresh: fetchData,
    patientsDataLoading: isLoading,
  };
};
