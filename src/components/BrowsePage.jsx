import { useSelector } from "react-redux"
import { playlistsSelector } from "./redux/slices/playlistsSlice"
import PlaylistDetailComponent from "./PlaylistDetailComponent"

const BrowsePage = () => {
    const playlists = useSelector(playlistsSelector)
    const renderedItems = () => {
        const playlistItems = Object.keys(playlists).map((key) => {
            const list = playlists[key]
            if (list.visibility === true) {
                return (
                    PlaylistDetailComponent({ playlist: list })
                )
            } else {
                return (
                    <></>
                )
            }
        })
        return playlistItems;
    }

    return (
        <>
            {renderedItems()}
        </>
    )
}

export default BrowsePage