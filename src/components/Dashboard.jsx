import './css/Profile.css';
import { auth } from '../firebase';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { doSignOut } from './general-functions';
import { Link } from 'react-router-dom';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './../firebase.js';
import PlaylistDetailComponent from './PlaylistDetailComponent';

const Profile = () => {
	const [signOutSuccess, setSignOutSuccess] = useState(null);
	const [displayName, setDisplayName] = useState('');
	const [photoURL, setPhotoURL] = useState('');
	const [playlists, setPlaylists] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const playlistDocs = [];
			const q = query(
				collection(db, 'playlists'),
				where('userUid', '==', `${auth.currentUser.uid}`)
			);

			try {
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					playlistDocs.push({
						key: doc.id,
						title: doc.data().title,
						author: doc.data().author,
						description: doc.data().description,
						artworkURL: doc.data().artworkURL,
						vibe: doc.data().vibe,
						tracklist: doc.data().tracklist,
					});
				});
				setPlaylists(playlistDocs);
			} catch (error) {
				console.error('Error fetching data:', error);
			}

			if (auth.currentUser) {
				setDisplayName(auth.currentUser.displayName || '');
				setPhotoURL(auth.currentUser.photoURL || '');
			}
		};

		fetchData();
	}, []);

	return (
		<>
			{displayName && (
				<>
					<h1>{displayName}</h1>
					<img
						src={photoURL}
						alt="profile pic"
						id="profile-pic"
					/>
					<div className="browsePage">
						{playlists.map((playlist) => {
							return PlaylistDetailComponent({ playlist: playlist });
						})}
					</div>
					<br />
					<Link to="/browse">
						<button onClick={() => doSignOut(dispatch)(setSignOutSuccess)}>
							Sign out
						</button>
					</Link>
					{signOutSuccess}
				</>
			)}
			{!displayName && <p>Loading...</p>}
		</>
	);
};

export default Profile;
