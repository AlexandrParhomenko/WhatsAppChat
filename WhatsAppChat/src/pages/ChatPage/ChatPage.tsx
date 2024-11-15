import {
    chatEndpoints,
    useDeleteNotificationMutation,
    useGetChatHistoryQuery,
    useReceiveNotificationQuery,
    useSetNewMessageMutation
} from "../../services/chatEndpoints.ts";
import {useSelector} from "react-redux";
import {selectAuthData} from "../../store/reducers/authSlice.ts";
import Loader from "../../components/Loader/Loader.tsx";
import {Input, InputRef, message} from "antd";
import {useEffect, useRef, useState} from "react";
import {IoSend} from "react-icons/io5";
import OtherUserMessage from "../../components/Messages/OtherUserMessage.tsx";
import UserMessage from "../../components/Messages/UserMessage.tsx";
import {FaUser} from "react-icons/fa";
import {setChat} from "../../store/reducers/chatSlice.ts";
import {useAppDispatch} from "../../hooks";
import {successfulResponse} from "../../utils";

const ChatPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageInput = useRef<InputRef>(null);
    const [messageText, setMessageText] = useState<string>("")
    const [sendMessage] = useSetNewMessageMutation()
    const dispatch = useAppDispatch()
    // const chat = useSelector(selectChat)
    const authData = useSelector(selectAuthData)
    let chatId = `${authData.phone.replaceAll(/\D/g, "")}@c.us`
    const queryData = {
        idInstance: authData.user_id,
        apiTokenInstance: authData.user_token,
        body: {
            chatId: chatId,
            count: 20
        }
    }
    const sendMessageQueryData = {
        idInstance: authData.user_id,
        apiTokenInstance: authData.user_token,
        body: {
            chatId: chatId,
            message: messageText
        }
    }
    const {data: messages, error: historyMessagesError} = useGetChatHistoryQuery(queryData)

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "instant"});
        }
    };

    useEffect(() => {
        if (messages) dispatch(setChat(messages))
        if (messageInput.current) {
            messageInput.current.focus();
        }
        scrollToBottom();
    }, [messages]);

    const {data: notification} = useReceiveNotificationQuery(
        {
            idInstance: authData.user_id,
            apiTokenInstance: authData.user_token,
        },
        {pollingInterval: 5000, skipPollingIfUnfocused: true}
    );

    const [deleteNotification] = useDeleteNotificationMutation();

    useEffect(() => {
        async function handleNotification() {
            if (!notification) return

            if (notification.body.typeWebhook === "incomingMessageReceived" || notification.body.typeWebhook === "outgoingAPIMessageReceived" || notification.body.typeWebhook === "outgoingMessageReceived") {
                const notificationBody = notification.body;
                const existingMessage = messages?.find(
                    (msg) => msg.idMessage === notificationBody.idMessage
                );
                if (existingMessage) {
                    console.log('message already in chat history');
                    await deleteNotification({
                        idInstance: authData.user_id,
                        apiTokenInstance: authData.user_token,
                        receiptId: notification.receiptId,
                    });
                    return;
                }

                const updateChatHistoryThunk = chatEndpoints.util?.updateQueryData(
                    'getChatHistory',
                    {
                        idInstance: authData.user_id,
                        apiTokenInstance: authData.user_token,
                        body: {
                            chatId: chatId,
                            count: 20,
                        }
                    },
                    (draftChatHistory) => {
                        const type = notificationBody.typeWebhook.includes('outgoing')
                            ? 'outgoing'
                            : 'incoming';
                        const typeMessage = notificationBody.messageData.typeMessage;
                        draftChatHistory.push({
                            type: type,
                            typeMessage: notificationBody.messageData.typeMessage,
                            textMessage: !typeMessage.toLowerCase().includes('text')
                                ? typeMessage
                                : notificationBody.messageData.extendedTextMessageData?.text ||
                                notificationBody.messageData.textMessageData?.textMessage ||
                                notificationBody.messageData.typeMessage,
                            timestamp: notificationBody.timestamp,
                            statusMessage: type === "outgoing" ? "read" : undefined,
                            sendByApi: notificationBody.sendByApi,
                            idMessage: notificationBody.idMessage,
                            chatId: notificationBody.senderData.chatId,
                        });
                        return draftChatHistory;
                    }
                );
                dispatch(updateChatHistoryThunk);
            }

            await deleteNotification({
                idInstance: authData.user_id,
                apiTokenInstance: authData.user_token,
                receiptId: notification.receiptId,
            });
        }

        handleNotification();
    }, [notification]);

    useEffect(() => {
        if (historyMessagesError) {
            successfulResponse(messageApi, "error", "Ошибка загрузки истории сообщений, проверьте введенные данные и повторите попытку")
        }
    }, [historyMessagesError])

    // if (!messages) return <Loader/>

    return (
        <div className={"chatWindow"}>
            {contextHolder}
            {!messages ? <Loader/> : <>
                <div className={"chatUserContainer"}>
                    <div className={"chatUserBar"}>
                        <FaUser color={"#f1f1f1"} size={20}/>
                    </div>
                    <span style={{fontWeight: "bold"}}>{authData.phone}</span>
                </div>
                <div className={"messagesWindow"}>
                    <div className={"messagesBlock"}>
                        {messages.map((el, idx) => {
                            if (el.typeMessage !== "textMessage" && el.typeMessage !== "extendedTextMessage") return null
                            return el.type === "outgoing" ? <UserMessage key={idx} message={el}/> :
                                <OtherUserMessage key={idx} message={el}/>
                        })}
                        <div ref={messagesEndRef}></div>
                    </div>
                </div>
                <div className={"messageInputWrapper"}>
                    <Input value={messageText} maxLength={300} onChange={(e) => setMessageText(e.target.value)}
                           ref={messageInput}
                           style={{padding: 20, border: "none"}}
                           placeholder={"Введите сообщение"}
                           onPressEnter={() => {
                               if (messageText.trim().length > 0) {
                                   sendMessage(sendMessageQueryData);
                                   setMessageText("")
                               }
                           }}/>
                    {messageText.trim().length > 0 && <div onClick={() => {
                        if (messageText.trim().length > 0) {
                            sendMessage(sendMessageQueryData);
                            setMessageText("")
                        }
                    }} className={"sendMessageBtn"}>
                        <IoSend color={"#ffbd8e"} size={20}/>
                    </div>}
                </div>
            </>}

        </div>
    );
};

export default ChatPage;