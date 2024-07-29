import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  id: number,
  firstName: string,
  lastName: string,
}

export const initialState: UserState = {
  id: 0,
  firstName: '',
  lastName: '',
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state = action.payload
      return state
    }
  },
});

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
