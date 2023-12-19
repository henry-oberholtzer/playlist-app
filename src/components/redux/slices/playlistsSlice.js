import { createSlice } from "@reduxjs/toolkit";
import { temporaryData } from "../../../assets/temporaryData";

const initialState = temporaryData;

export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        addPlaylist: (state, action) => {
            return {...state, [action.payload.key]: action.payload}
        }
    }
});

export const { addPlaylist } = playlistsSlice.actions;

export const playlistsSelector = (state) => state.playlists

export default playlistsSlice.reducer;