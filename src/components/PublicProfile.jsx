import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { fetchPlaylistData } from './general-functions';
import PlaylistDetailComponent from './PlaylistDetailComponent';

const PublicProfile = () => {
	const [profile, setProfile] = useState();
	const [playlists, setPlaylists] = useState([]);
	const { userID } = useParams();
	useEffect(() => {
		const fetchProfile = async () => {
			const docRef = doc(db, 'users', userID);
			const docSnap = await getDoc(docRef);
			setProfile(docSnap.data());
		};
		fetchPlaylistData(setPlaylists)('userUid')('==')(userID)('visibility')(
			'=='
		)(true);
		fetchProfile();
	}, [userID]);
	useEffect;

	return (
		<>
			{profile ? (
				<>
					<h1>{profile.displayName}</h1>
					<img
						src={profile.photoURL}
						alt="profile pic"
						id="profile-pic"
					/>
					<br />
					<div className="browsePage">
						{playlists.map((playlist) => {
							return PlaylistDetailComponent({ playlist: playlist });
						})}
					</div>
				</>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
};

export default PublicProfile;
