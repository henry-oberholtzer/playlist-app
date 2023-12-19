import { useEffect, useState } from "react";
import PlaylistDetailComponent from "./PlaylistDetailComponent"
import { collection, onSnapshot } from "firebase/firestore";
import { db } from './../firebase.js'

const BrowsePage = () => {
    const [playlists, setPlaylists] = useState([]);
    const [renderedItems, setRenderedItems] = useState(null)

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

    const itemRenderer = (playlistArray) => {
        const playlistItems = playlistArray.map((object) => {
            console.log(object)
            return (object)
            // return PlaylistDetailComponent({ playlist: object })
        })
        // return playlistItems;
        console.log(playlistItems)
    }

    return (
        <>
            {playlists.map((playlist) => {
                return (PlaylistDetailComponent({ playlist: playlist }))
            })}
        </>
    )
}

export default BrowsePage