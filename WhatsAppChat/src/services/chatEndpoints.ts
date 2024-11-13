import {baseApi} from "./apiService";
import {
    ChatHistoryQueryData, DeleteNotificationParameters, InstanceInterface,
    Message,
    ReceiveNotificationResponseInterface, ResultResponseInterface,
    SendMessageQueryData
} from "../types/types.ts";

export const chatEndpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getChatHistory: builder.query<Message[], ChatHistoryQueryData>({
            query: (data) => ({
                url: `waInstance${data.idInstance}/getChatHistory/${data.apiTokenInstance}`,
                method: 'POST',
                body: data.body,
            }),
            transformResponse: (response: Message[]) => {
                return response.reverse();
            },
            providesTags: () => ["ChatHistory"]
        }),
        setNewMessage: builder.mutation<SendMessageQueryData, SendMessageQueryData>({
            query: (data) => ({
                url: `waInstance${data.idInstance}/sendMessage/${data.apiTokenInstance}`,
                method: 'POST',
                body: data.body,
            }),
            // invalidatesTags: ["ChatHistory"]
        }),
        receiveNotification: builder.query<ReceiveNotificationResponseInterface, InstanceInterface>({
            query: ({ idInstance, apiTokenInstance }) => ({
                url: `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
            }),
        }),
        deleteNotification: builder.mutation<ResultResponseInterface, DeleteNotificationParameters>({
            query: ({ idInstance, apiTokenInstance, receiptId }) => ({
                url: `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
                method: 'DELETE',
            }),
        }),
    })
});

export const {
    useGetChatHistoryQuery,
    useSetNewMessageMutation,
    useReceiveNotificationQuery,
    useDeleteNotificationMutation
} = chatEndpoints;

