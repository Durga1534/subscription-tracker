export interface TemplateData {
    userName: string;
    subscriptionName: string;
    renewalDate: string;
    planName: string;
    price: string;
    paymentMethod: string;
    accountSettingsLink?: string;
    supportLink?: string;
    daysLeft?: number;
}
export declare const generateEmailTemplate: ({ userName, subscriptionName, renewalDate, planName, price, paymentMethod, accountSettingsLink, supportLink, daysLeft, }: TemplateData) => string;
export declare const emailTemplates: {
    label: string;
    generateSubject: (data: TemplateData) => string;
    generateBody: (data: TemplateData) => string;
}[];
