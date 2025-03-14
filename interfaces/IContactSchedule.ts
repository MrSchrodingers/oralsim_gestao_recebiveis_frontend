export interface IContactSchedule {
  id: string;
  patient: string;  
  contract?: string;
  clinic: string;  
  current_step: number;
  channel: string; 
  scheduled_date: Date;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IContactScheduleCreated
  extends Omit<IContactSchedule, "id" | "created_at" | "updated_at"> {}

