import { createSlice } from "@reduxjs/toolkit";

const deviceSlice = createSlice({
  name: "device",
  initialState: {
    multipleDeviceSelection: [],
  },
  reducers: {
    onAddMultipleDeviceSelection: (state, { payload }) => {
      let index = 0;
      state.multipleDeviceSelection.splice(index, 0, payload);
      index++;
    },
    onRemoveDeviceFromMultipleDeviceType: (state, { payload }) => {
      state.multipleDeviceSelection = payload;
    },
    onEditNumberInRowInMultipleDeviceType: (state, { payload }) => {
      state.multipleDeviceSelection = payload;
    },
  },
});

// action creators are generated for each case reducer function

export const {
  onAddMultipleDeviceSelection,
  onRemoveDeviceFromMultipleDeviceType,
  onEditNumberInRowInMultipleDeviceType
} = deviceSlice.actions;

export default deviceSlice.reducer;
