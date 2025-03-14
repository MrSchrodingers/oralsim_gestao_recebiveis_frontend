export interface IClinic {
  id: string;
  name: string;
  cnpj?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IClinicCreated extends Omit<IClinic, "id" | "created_at" | "updated_at"> {}
