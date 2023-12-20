import { useEffect, useState } from "react";
import PlaylistDetailComponent from "./PlaylistDetailComponent"
import { collection, onSnapshot } from "firebase/firestore";
import { db } from './../firebase.js'
import './css/browsePage.css'

const BrowsePage = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const unSubscribe = onSnapshot(
            collection(db, "playlists"),
            (collectionSnapshot) => {
                const playlistDocs = []
                collectionSnapshot.forEach((doc) => {
                        playlistDocs.push({
                            key: doc.id,
                            title: doc.data().title,
                            author: doc.data().author,
                            description: doc.data().description,
                            artworkURL: doc.data().artworkURL,
                            vibe: doc.data().vibe,
                            tracklist: doc.data().tracklist
                        })
                });
                setPlaylists(playlistDocs)
            },
            (error) => {
                console.log(error.message)
            }
        );
        return () => unSubscribe()
    }, [])


    return (
        <div className="browsePage">
            {playlists.map((playlist) => {
                return PlaylistDetailComponent({ playlist: playlist })
            })}
        </div>
    )
}

export default BrowsePage