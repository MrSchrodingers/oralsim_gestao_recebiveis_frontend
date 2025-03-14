import { useEffect, useState } from "react";
import { notification } from "antd";
import { installmentService } from "@/services/installment.service";
import type { IInstallment } from "@/interfaces/IInstallment";

interface UseInstallmentsResponse {
  installments: IInstallment[];
  installmentsTotal: number;
  installmentsRefresh: () => void;
  installmentsLoading: boolean;
}

export const useInstallments = (): UseInstallmentsResponse => {
  const [data, setData] = useState<IInstallment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    installmentService
      .getAll()
      .then((res) => {
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar parcelas (installments)",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    installments: data,
    installmentsTotal: total,
    installmentsRefresh: fetchData,
    installmentsLoading: isLoading,
  };
};
