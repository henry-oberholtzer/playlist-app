import { createSlice } from '@reduxjs/toolkit';

export const userInterfaceSlice = createSlice({
	name: 'userInterface',
	initialState: {
		auth: false,
	},
	reducers: {
		logIn: (state) => {
			state.auth = true;
		},
		logOut: (state) => {
			state.auth = false;
		},
	},
});

export const { logIn, logOut } = userInterfaceSlice.actions;

export const authSelector = (state) => state.userInterface.auth;

export default userInterfaceSlice.reducer;
