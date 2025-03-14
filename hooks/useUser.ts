import { IUser } from "@/interfaces/IUser";
import { userService } from "@/services/user.service";
import { notification } from "antd";
import { useEffect, useState } from "react";


interface UseUserResponse {
  user: IUser;
  userRefresh: () => void;
  userLoading: boolean;
}

export const useUser = ({
  user_id,
}: { user_id: string }): UseUserResponse => {
  const [data, setData] = useState<IUser>({} as IUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    userService
      .getById(user_id)
      .then(res => {
        if (!res.data) {
          notification.error({
            message: "Usuário não encontrado",
          });
          return;
        }
        setData(res.data);
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
    user: data,
    userRefresh: fetchData,
    userLoading: isLoading,
  };
};
