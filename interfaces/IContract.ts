export interface IContract {
  id: string;
  oralsim_contract_id?: number;
  patient: string; 
  clinic: string;  
  contract_version?: string;
  remaining_installments?: number;
  overdue_amount?: number; 
  first_billing_date?: Date;
  negotiation_notes?: string;
  payment_method?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IContractCreated extends Omit<IContract, "id" | "created_at" | "updated_at"> {}
