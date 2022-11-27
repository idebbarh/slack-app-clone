import {createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChannelFormOpen:false,
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    openCreateChannelForm: (state) => {
      state.isChannelFormOpen = true;
    },
    closeCreateChannelForm: (state) => {
      state.isChannelFormOpen = false;
    },
  }
});

export const { openCreateChannelForm,closeCreateChannelForm } = channelSlice.actions;
export const selectIsChannelFormOpen = (state) => state.channel.isChannelFormOpen;
export default channelSlice.reducer;
