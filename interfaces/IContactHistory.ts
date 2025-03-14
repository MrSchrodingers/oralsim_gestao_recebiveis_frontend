export interface IContactHistory {
  id: string;
  patient: string;  
  contract?: string; 
  clinic: string;  
  contact_type: string;
  sent_at?: Date;
  feedback_status?: string;
  observation?: string;
  message?: string;  
  schedule?: string;  
  created_at?: Date;
  updated_at?: Date;
}

export interface IContactHistoryCreated extends Omit<IContactHistory, "id" | "created_at" | "updated_at"> {}
