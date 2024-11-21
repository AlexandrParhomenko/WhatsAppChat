import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {Message} from "../../types/types.ts";

interface ChatItem {
    item: Message[]
}

const initialState: ChatItem = {
    item: [] as Message[]
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChat(state, action) {
            state.item = action.payload
        }
    }
});

export const { setChat } = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat.item;

export default chatSlice.reducer;