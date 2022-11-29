import { configureStore } from '@reduxjs/toolkit';
import channelReducer from '../features/channelSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    channel: channelReducer,
    user:userReducer
  },
});
