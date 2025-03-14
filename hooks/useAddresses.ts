import { useEffect, useState } from "react";
import { notification } from "antd";
import { addressService } from "@/services/address.service";
import type { IAddress } from "@/interfaces/IAddress";

interface UseAddressesResponse {
  addresses: IAddress[];
  addressesTotal: number;
  addressesRefresh: () => void;
  addressesLoading: boolean;
}

export const useAddresses = (): UseAddressesResponse => {
  const [data, setData] = useState<IAddress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    addressService
      .getAll()
      .then((res) => {
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar endereços",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    addresses: data,
    addressesTotal: total,
    addressesRefresh: fetchData,
    addressesLoading: isLoading,
  };
};
