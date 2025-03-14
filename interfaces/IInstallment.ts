export interface IInstallment {
  id: string;
  contract: string;
  installment_number: number;
  due_date: Date;
  installment_amount: number; 
  received?: boolean;
  installment_status?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IInstallmentCreated extends Omit<IInstallment, "id" | "created_at" | "updated_at"> {}

