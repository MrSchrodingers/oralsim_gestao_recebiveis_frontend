export interface IAddress {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood?: string;
  city: string;
  state: string;
  zip_code: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IAddressCreated extends Omit<IAddress, "id" | "created_at" | "updated_at"> {}
