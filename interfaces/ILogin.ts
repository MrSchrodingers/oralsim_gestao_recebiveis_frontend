export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user_id: string;
  token: string;
}
