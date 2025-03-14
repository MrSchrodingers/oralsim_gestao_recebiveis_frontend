import { useEffect, useState } from "react";
import { notification } from "antd";
import { addressService } from "@/services/address.service";
import type { IAddress } from "@/interfaces/IAddress";

interface UseAddressResponse {
  address: IAddress;
  addressRefresh: () => void;
  addressLoading: boolean;
}

export const useAddress = ({ address_id }: { address_id: string }): UseAddressResponse => {
  const [data, setData] = useState<IAddress>({} as IAddress);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    if (!address_id || isLoading) return;
    setIsLoading(true);

    addressService
      .getById(address_id)
      .then((res) => {
        if (!res.data) {
          notification.error({
            message: "Endereço não encontrado",
          });
          return;
        }
        setData(res.data);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar endereço",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [address_id]);

  return {
    address: data,
    addressRefresh: fetchData,
    addressLoading: isLoading,
  };
};
