export interface IPatientPhone {
  id: string;
  patient: string;
  phone_number: string;
  phone_type?: "residencial" | "celular" | "comercial" | "contato" | null; 
  created_at?: Date;
  updated_at?: Date;
}

export interface IPatientPhoneCreated extends Omit<IPatientPhone, "id" | "created_at" | "updated_at"> {}
