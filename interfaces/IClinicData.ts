export interface IClinicData {
  id: string;
  clinic: string;
  oralsim_clinic_id?: number;
  corporate_name?: string;
  acronym?: string;
  address?: string;
  active?: boolean;
  franchise?: boolean;
  timezone?: string;
  harvest_date?: Date;
  first_billing_date?: Date;
  referral_program?: boolean;
  show_lp_oralsin?: boolean;
  landing_page_url?: string;
  oralsin_lp_url?: string;
  facebook_url?: string;
  facebook_chat_url?: string;
  whatsapp_url?: string;
  lead_email?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IClinicDataCreated extends Omit<IClinicData, "id" | "created_at" | "updated_at"> {}

