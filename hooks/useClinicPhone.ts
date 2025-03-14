import { useEffect, useState } from "react";
import { notification } from "antd";
import { clinicPhoneService } from "@/services/clinicPhone.service";
import type { IClinicPhone } from "@/interfaces/IClinicPhone";

interface UseClinicPhoneResponse {
  clinicPhone: IClinicPhone;
  clinicPhoneRefresh: () => void;
  clinicPhoneLoading: boolean;
}

export const useClinicPhone = ({ clinic_phone_id }: { clinic_phone_id: string }): UseClinicPhoneResponse => {
  const [data, setData] = useState<IClinicPhone>({} as IClinicPhone);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    if (!clinic_phone_id || isLoading) return;
    setIsLoading(true);

    clinicPhoneService
      .getById(clinic_phone_id)
      .then((res) => {
        if (!res.data) {
          notification.error({
            message: "Telefone de clínica não encontrado",
          });
          return;
        }
        setData(res.data);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar telefone de clínica",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [clinic_phone_id]);

  return {
    clinicPhone: data,
    clinicPhoneRefresh: fetchData,
    clinicPhoneLoading: isLoading,
  };
};
