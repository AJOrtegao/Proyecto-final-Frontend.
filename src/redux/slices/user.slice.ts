import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  name: '',
  email: '',
  role: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string; email: string; role: string }>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.name = '';
      state.email = '';
      state.role = '';
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
