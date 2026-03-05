interface SendReminderEmailParams {
    to: string;
    type: string;
    subscription: any;
}
export declare const sendReminderEmail: ({ to, type, subscription, }: SendReminderEmailParams) => Promise<void>;
export {};
