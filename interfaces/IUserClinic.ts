export interface IUserClinic {
  id: string;
  user: string; 
  clinic: string; 
  linked_at?: Date;
}

export interface IUserClinicCreated extends Omit<IUserClinic, "id"> {}
