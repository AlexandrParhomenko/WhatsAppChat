export interface Login {
    phone: string
    user_token: string
    user_id: string
}

export interface ChatHistoryQueryData {
    idInstance: string
    apiTokenInstance: string
    body: {
        chatId: string
        count: number
    }
}

export interface SendMessageQueryData {
    idInstance: string
    apiTokenInstance: string
    body: {
        chatId: string
        message: string
    }
}

export interface Message {
    chatId: string
    idMessage: string
    sendByApi: boolean
    statusMessage?: string
    textMessage: string
    timestamp: number
    type: string
    typeMessage: string
}

export interface InstanceInterface {
    idInstance: string;
    apiTokenInstance: string;
}

export interface ReceiveNotificationResponseInterface {
    receiptId: number;
    body: Record<string, any>;
}

export type DeleteNotificationParameters = InstanceInterface &
    Pick<ReceiveNotificationResponseInterface, 'receiptId'>;

export interface ResultResponseInterface {
    result: boolean;
}