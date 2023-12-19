import { configureStore } from "@reduxjs/toolkit";
import userInterfaceReducer from './slices/userInterfaceSlice'
import playlistsReducer from "./slices/playlistsSlice";

export default configureStore({
    reducer: {
        userInterface: userInterfaceReducer,
        playlists: playlistsReducer
    },
})