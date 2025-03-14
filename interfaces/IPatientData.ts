export interface IPatientData {
  patient: Patient
  phones: Phone[]
  address: Address
  contracts: Contract[]
  installments: Installment[]
  contact_schedules: ContactSchedule[]
}

export interface Patient {
  id: string
  oralsim_patient_id: number
  clinic_id: string
  name: string
  cpf: string
  address_id: string
  contact_name: string
  email: string
  created_at: string
  updated_at: string
}

export interface Phone {
  id: string
  patient_id: string
  phone_number: string
  phone_type: string
  created_at: string
  updated_at: string
}

export interface Address {
  id: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  zip_code: string
  created_at: string
  updated_at: string
}

export interface Contract {
  id: string
  oralsim_contract_id: number
  patient_id: string
  clinic_id: string
  contract_version: string
  remaining_installments: number
  overdue_amount: string
  first_billing_date: string
  negotiation_notes: string
  payment_method: string
  created_at: string
  updated_at: string
}

export interface Installment {
  id: string
  contract_id: string
  installment_number: number
  due_date: string
  installment_amount: string
  received: boolean
  installment_status: string
  created_at: string
  updated_at: string
}

export interface ContactSchedule {
  id: string
  patient_id: string
  contract_id: string
  clinic_id: string
  current_step: number
  channel: string
  scheduled_date: string
  status: string
  created_at: string
  updated_at: string
}
