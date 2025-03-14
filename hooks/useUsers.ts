import { IUser } from "@/interfaces/IUser";
import { userService } from "@/services/user.service";
import { notification } from "antd";
import { useEffect, useState } from "react";


interface UseUsersResponse {
  users: IUser[];
  usersTotal: number;
  usersRefresh: () => void;
  usersLoading: boolean;
}

export const useUsers = ({
}): UseUsersResponse => {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    userService
      .getAll()
      .then(res => {
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar usuários",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    users: data,
    usersTotal: total,
    usersRefresh: fetchData,
    usersLoading: isLoading,
  };
};
