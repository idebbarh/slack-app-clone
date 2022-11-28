import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChannelFormOpen: false,
  channelName: "",
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    openCreateChannelForm: (state) => {
      state.isChannelFormOpen = true;
    },
    closeCreateChannelForm: (state) => {
      state.isChannelFormOpen = false;
    },
    setChannelName: (state, action) => {
      state.channelName = action.payload;
    },
  },
});

export const {
  openCreateChannelForm,
  closeCreateChannelForm,
  setChannelName,
} = channelSlice.actions;
export const selectIsChannelFormOpen = (state) =>
  state.channel.isChannelFormOpen;
export const selectChannelName = (state) => state.channel.channelName;
export default channelSlice.reducer;
