export interface ICoveredClinic {
  id: string;
  oralsim_clinic_id: number;
  name: string;
  cnpj?: string;
  corporate_name?: string;
  acronym?: string;
  active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ICoveredClinicCreated extends Omit<ICoveredClinic, "id" | "created_at" | "updated_at"> {}