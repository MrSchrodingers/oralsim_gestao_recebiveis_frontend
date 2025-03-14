export interface IUser {
  id: string;  
  name: string;
  clinic_name?: string;
  email: string;
  password?: string; 
  role: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserCreated extends Omit<IUser, "id" | "created_at" | "updated_at"> {}
