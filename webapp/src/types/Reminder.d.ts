export type Reminder = {
    id: number;
    userId: number;
    reminderName: string;
    reminderDesc?: string;
    date?: Date;
    alertMe: boolean;
    alertAt?: number;
  };
  
  export type ReminderCreateReq = {
    userId: number;
    reminderName: string;
    reminderDesc?: string;
    date?: Date;
    alertMe: boolean;
    alertAt?: number;
  };
  
  export type ReminderUpdateReq = {
    reminderName?: string;
    reminderDesc?: string;
    date?: Date;
    alertMe: boolean;
    alertAt?: number;
  };
  