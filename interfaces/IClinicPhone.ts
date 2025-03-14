export interface IClinicPhone {
  id: string;
  clinic: string;
  phone_number: string;
  phone_type?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IClinicPhoneCreated extends Omit<IClinicPhone, "id" | "created_at" | "updated_at"> {}
