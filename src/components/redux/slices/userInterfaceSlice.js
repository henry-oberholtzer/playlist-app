import { createSlice } from "@reduxjs/toolkit";

export const pageDirectory = {
    BrowsePage: 0,
    UserDashboard: 1,
    PlaylistCreateForm: 2,
    PlaylistEditForm: 3,
    LogInPage: 4,
    RegistrationPage: 5, 

}

export const userInterfaceSlice = createSlice({
    name: 'userInterface',
    initialState: {
        page: 0,
        visibleTracklist: ""
    },
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload
        },
        setVisibleTracklist: (state, action) => {
            state.visibleTracklist = action.payload;
        }
    }
})

export const { changePage, setVisibleTracklist } = userInterfaceSlice.actions;

export const userInterfaceSelector = (state) => state.userInterface
export const visibleTracklistSelector = (state) => state.userInterface.visibleTracklist

export default userInterfaceSlice.reducer;