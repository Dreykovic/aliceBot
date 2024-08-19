import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
  message?: string | null;
  type: 1 | 0;
}

const initialState: MessageState = {
  message: null,
  type: 1,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    sendGlobalMessage: (state, action: PayloadAction<MessageState>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    resetGlobalMessage: (state) => {
      state.message = initialState.message;
      state.type = initialState.type;
    },
  },
});

export const { sendGlobalMessage, resetGlobalMessage } = messageSlice.actions;

export default messageSlice.reducer;
