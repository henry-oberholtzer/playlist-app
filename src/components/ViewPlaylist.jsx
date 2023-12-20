import { doc, getDoc } from "firebase/firestore"
import { db } from './../firebase.js'
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import './css/ViewPlaylist.css'

const renderTracklist = (selectTracklist) => {
    return (
        <ol id="viewTracklist">
            {selectTracklist.map((track, i) => {
                return (
                    <li key={i}>{track.artist} - {track.title} <em>{track.album}</em></li>
                )
            })}
        </ol>
    )
}

const ViewPlaylist = () => {
	const [playlist, setPlaylist] = useState()
	const { playlistKey } = useParams()
	useEffect(() => {
		const fetchPlaylist = async () => {
			const docRef = doc(db, "playlists", playlistKey);
			const docSnap = await getDoc(docRef);
			setPlaylist(docSnap.data());
		}
		fetchPlaylist()
	}, [playlistKey])

    if (playlist) {
        console.log(playlist)
        return (
            <>
                <h1>{playlist.title}</h1>
                <h3>{playlist.vibe.charAt(0).match(/[aeiou]/i) ? "An" : "A"} <em>&quot;{playlist.vibe.replace(/-/, " ")}&quot;</em> playlist by {playlist.author}</h3>
                <div id="viewColumns">
                {playlist.tracklist ? renderTracklist(playlist.tracklist) : ""}
                <img id="viewAlbumArt" src={playlist.artworkURL} alt="album art" />
                </div>
                <p><em>{playlist.description}</em></p>
                
            </>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default ViewPlaylist