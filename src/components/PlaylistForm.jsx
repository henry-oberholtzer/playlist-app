import { useState } from "react"
import { handleFieldObjectChange } from "./form-functions"


const PlaylistForm = () => {
    const [currentTrack, setCurrentTrack] = useState({
        artist: "",
        title: "",
        album: "",
    })
    const [playlistDetails, setPlaylistDetails] = useState({
        key: "",
        title: "",
        description: "",
        artworkURL: "",
        vibe: "",
        
    })
    const [tracklist, setTracklist] = useState([])
    const playlistField = handleFieldObjectChange(playlistDetails)(setPlaylistDetails)
    const trackField = handleFieldObjectChange(currentTrack)(setCurrentTrack)
    const handleTrackSubmit = (e) => {
        e.preventDefault();
        setTracklist([...tracklist, currentTrack])
        setCurrentTrack({
            artist: "",
            title: "",
            album: "",
        })
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
        <form>
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
                    htmlFor="artworkURL"
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
            <div className="tracklist">
                {renderTracklist(tracklist)}
            <div className="trackInput">
                <input
                    name="artist"
                    value={currentTrack.artist}
                    onChange={(e) => trackField(e)}
                >
                </input>
                <input
                    name="title"
                    value={currentTrack.title}
                    onChange={(e) => trackField(e)}
                    >
                </input>
                <input
                    type="text"
                    name="album"
                    value={currentTrack.album}
                    onChange={(e) => trackField(e)}>
                </input>
                <button type="submit" onClick={(e) => handleTrackSubmit(e)}>Add Track</button>
            </div>
            </div>
        </form>
    )
}

export default PlaylistForm