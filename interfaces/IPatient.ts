export interface IPatient {
  id: string;
  oralsim_patient_id?: number;
  clinic: string;
  name: string;
  cpf?: string;
  address?: string; 
  contact_name?: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IPatientCreated extends Omit<IPatient, "id" | "created_at" | "updated_at"> {}
