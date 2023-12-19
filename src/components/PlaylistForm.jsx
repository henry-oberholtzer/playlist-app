import { useState } from "react"
import { handleFieldObjectChange } from "./form-functions"
import { useDispatch } from "react-redux"
import { addPlaylist } from "./redux/slices/playlistsSlice";
import { v4 } from "uuid";
const PlaylistForm = () => {
    const [currentTrack, setCurrentTrack] = useState({
        artist: "",
        title: "",
        album: "",
    })
    const [playlistDetails, setPlaylistDetails] = useState({
        key: v4(),
        title: "",
        author: "",
        description: "",
        artworkURL: "",
        vibe: "",
        visibility: true,
    })
    const [tracklist, setTracklist] = useState([])
    const playlistField = handleFieldObjectChange(playlistDetails)(setPlaylistDetails)
    const trackField = handleFieldObjectChange(currentTrack)(setCurrentTrack)
    const handleTrackSubmit = () => {
        setTracklist([...tracklist, currentTrack])
        setCurrentTrack({
            artist: "",
            title: "",
            album: "",
        })
    }
    const dispatch = useDispatch();

    const handlePlaylistSubmit = (e) => {
        e.preventDefault()
        const playlistObject = {
            ...playlistDetails,
            tracklist: tracklist
        }
        console.log(playlistObject)
        dispatch(addPlaylist(playlistObject))
    }
    const renderTracklist = (selectTracklist) => {
        return(
            <ol>
                {selectTracklist.map((track, i) => {
                        return (
                        <li key={i}>{track.artist} - {track.title} <em>{track.album}</em></li>
                        )
                })}
            </ol>
        )
    }    

    return (
        <form onSubmit={(e) => handlePlaylistSubmit(e)}>
            <div className="mainInfo">

                <label
                    htmlFor="title"
                >
                    Playlist Title:
                </label>
                <input
                    name="title"
                    type="text"
                    value={playlistDetails.title}
                    onChange={(e) => playlistField(e)}>
                </input>
                <label
                    htmlFor="author"
                >
                    Author:
                </label>
                <input
                    name="author"
                    type="text"
                    value={playlistDetails.author}
                    onChange={(e) => playlistField(e)}>
                </input>
                <br />
                <label
                    htmlFor="description"
                >
                    Description:
                </label>
                <textarea
                    name="description"
                    type="textarea"
                    value={playlistDetails.description}
                    onChange={(e) => playlistField(e)}>
                </textarea>
                <br />
                <label
                    htmlFor="artworkURL"
                >
                    Playlist Artwork URL:
                </label>
                <input
                    name="artworkURL"
                    type="text"
                    value={playlistDetails.artworkURL}
                    onChange={(e) => playlistField(e)}>
                </input>
                <label
                    htmlFor="vibe"
                >
                    Vibe:
                </label>
                <select
                    name="vibe"
                    value={playlistDetails.vibe}
                    onChange={(e) => playlistField(e)}>
                    <option value="squiggly">Squiggly</option>
                    <option value="cubic">Cubic</option>
                    <option value="manic">Manic</option>
                    <option value="gasoline-fight">Gasoline Fight</option>
                    <option value="drop-ceiling">Drop Ceiling</option>
                    <option value="smooth-tile">Smooth Tile</option>
                    <option value="fast-casual">Fast Casual</option>
                    <option value="elevator">Elevator</option>
                    <option value="posturing">Posturing</option>
                    <option value="waxing-poet">Waxing Poetic</option>
                    <option value="david-lynch-on-a-bender">David Lynch On A Bender</option>
                    <option value="nicky-cage">Nicky Cage</option>
                    <option value="copyright-infringement">Copyright Infringement</option>
                    <option value="tikka-masala">Tikka Masala</option>
                    <option value="court-date">Court Date</option>
                    <option value="business-casual">Business Casual</option>
                    <option value="insider-trading">Insider Trading</option>
                    <option value="fruit-stand">Fruit Stand</option>
                    <option value="loitering">Loitering</option>
                </select>
            </div>
            <hr />
            <div className="tracklist">
                {renderTracklist(tracklist)}
            <div className="trackInput">
            <label className="hidden" htmlFor="artist">Artist </label>
                <input
                    name="artist"
                    value={currentTrack.artist}
                    placeholder="Artist"
                    onChange={(e) => trackField(e)}
                >
                </input>
                <label className="hidden" htmlFor="title">Trackt Title: </label>
                <input
                    name="title"
                    value={currentTrack.title}
                    placeholder="Track Title"
                    onChange={(e) => trackField(e)}
                    >
                </input>
                <label className="hidden"  htmlFor="album">Album: </label>
                <input
                    type="text"
                    name="album"
                    placeholder="Album Title"
                    value={currentTrack.album}
                    onChange={(e) => trackField(e)}>
                </input>
                <button type="submit" onClick={(e) => handleTrackSubmit(e)}>Add Track</button>
            </div>
            <div>
            <input 
                type="checkbox"
                id="visibility"
                name="visibility"
                onChange={() => setPlaylistDetails({...playlistDetails, visibility: !playlistDetails.visibility})}
                checked={playlistDetails.visibility} />
            <label htmlFor="visibility">Make this Playlist Public</label>
            </div>
            </div>
            <button type="submit">Save & Submit Playlist</button>
        </form>
    )
}

export default PlaylistForm