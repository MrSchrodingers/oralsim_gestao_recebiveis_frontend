import { useEffect, useState } from "react";
import { notification } from "antd";
import { patientService } from "@/services/patient.service";
import type { IPatient } from "@/interfaces/IPatient";

interface UsePatientResponse {
  patient: IPatient;
  patientRefresh: () => void;
  patientLoading: boolean;
}

export const usePatient = ({ patient_id }: { patient_id: string }): UsePatientResponse => {
  const [data, setData] = useState<IPatient>({} as IPatient);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    if (!patient_id || isLoading) return;
    setIsLoading(true);

    patientService
      .getById(patient_id)
      .then((res) => {
        if (!res.data) {
          notification.error({
            message: "Paciente não encontrado",
          });
          return;
        }
        setData(res.data);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar paciente",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [patient_id]);

  return {
    patient: data,
    patientRefresh: fetchData,
    patientLoading: isLoading,
  };
};
