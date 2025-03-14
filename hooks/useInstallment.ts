import { useEffect, useState } from "react";
import { notification } from "antd";
import { installmentService } from "@/services/installment.service";
import type { IInstallment } from "@/interfaces/IInstallment";

interface UseInstallmentResponse {
  installment: IInstallment;
  installmentRefresh: () => void;
  installmentLoading: boolean;
}

export const useInstallment = ({
  installment_id,
}: {
  installment_id: string;
}): UseInstallmentResponse => {
  const [data, setData] = useState<IInstallment>({} as IInstallment);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    if (!installment_id || isLoading) return;
    setIsLoading(true);

    installmentService
      .getById(installment_id)
      .then((res) => {
        if (!res.data) {
          notification.error({
            message: "Parcela (installment) não encontrada",
          });
          return;
        }
        setData(res.data);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar parcela (installment)",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [installment_id]);

  return {
    installment: data,
    installmentRefresh: fetchData,
    installmentLoading: isLoading,
  };
};
