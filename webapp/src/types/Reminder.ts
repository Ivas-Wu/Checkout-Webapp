export type Reminder = {
    id: number;
    userId: number;
    reminderName: string;
    reminderDesc?: string;
    date?: Date;
    urgent: boolean;
    remindme?: number;
  };
  
  export type ReminderCreateReq = {
    userId: number;
    reminderName: string;
    reminderDesc?: string;
    date?: Date;
    urgent: boolean;
    remindme?: number;
  };
  
  export type ReminderUpdateReq = {
    reminderName?: string;
    reminderDesc?: string;
    date?: Date;
    urgent: boolean;
    remindme?: number;
  };
  