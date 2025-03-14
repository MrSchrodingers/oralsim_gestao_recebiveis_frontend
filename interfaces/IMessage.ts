export interface IMessage {
  id: string;
  type: "sms" | "email" | "whatsapp";
  content: string;
  step: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IMessageCreated extends Omit<IMessage, "id" | "created_at" | "updated_at"> {}
