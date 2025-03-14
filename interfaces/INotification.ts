export interface INotification {
  patient_ids: string[],
  step: number
}

export interface INotificationResponse {
  message: string
}