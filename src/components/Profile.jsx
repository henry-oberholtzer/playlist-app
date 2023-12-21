import './css/Profile.css';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from './redux/slices/userInterfaceSlice';
import { doSignOut } from './general-functions';

const Profile = () => {
	const [signOutSuccess, setSignOutSuccess] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// function doSignOut() {
	// 	signOut(auth)
	// 		.then(function () {
	// 			dispatch(logOut());
	// 			navigate('/log-in');
	// 		})
	// 		.catch(function (error) {
	// 			setSignOutSuccess(`There was an error signing out: ${error.message}!`);
	// 		});
	// }

	return (
		<>
			<h1>{auth.currentUser.displayName}</h1>
			<img
				src={auth.currentUser.photoURL}
				alt="profile pic"
				id="profile-pic"
			/>
			<br />
			<button
				onClick={doSignOut()(dispatch)(setSignOutSuccess)(navigate)('/log-in')}>
				Sign out
			</button>
			{signOutSuccess}
		</>
	);
};

export default Profile;
