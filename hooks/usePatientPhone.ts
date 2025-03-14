import { useEffect, useState } from "react";
import { notification } from "antd";
import { patientPhoneService } from "@/services/patientPhone.service";
import type { IPatientPhone } from "@/interfaces/IPatientPhone";

interface UsePatientPhoneResponse {
  patientPhone: IPatientPhone;
  patientPhoneRefresh: () => void;
  patientPhoneLoading: boolean;
}

export const usePatientPhone = ({ patient_phone_id }: { patient_phone_id: string }): UsePatientPhoneResponse => {
  const [data, setData] = useState<IPatientPhone>({} as IPatientPhone);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    if (!patient_phone_id || isLoading) return;
    setIsLoading(true);

    patientPhoneService
      .getById(patient_phone_id)
      .then((res) => {
        if (!res.data) {
          notification.error({
            message: "Telefone de paciente não encontrado",
          });
          return;
        }
        setData(res.data);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar telefone de paciente",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [patient_phone_id]);

  return {
    patientPhone: data,
    patientPhoneRefresh: fetchData,
    patientPhoneLoading: isLoading,
  };
};
