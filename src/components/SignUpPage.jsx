import { useState } from 'react';
import FileUpload from './FileUpload';
import { useDispatch } from 'react-redux';
import { doSignUp } from './general-functions';
import { handleFieldObjectChange } from './general-functions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from './redux/slices/userInterfaceSlice';
import { useNavigate } from 'react-router';

function SignUpPage() {
	const [signUpSuccess, setSignUpSuccess] = useState(null);
	const [photoURL, setPhotoURL] = useState();
	const dispatch = useDispatch();
	const [userObject, setUserObject] = useState();
	const handleField = handleFieldObjectChange(userObject)(setUserObject);
	const nav = useNavigate();
	const authBoolean = useSelector(authSelector);
	useEffect(() => {
		if (authBoolean === true) {
			nav('/browse');
		}
	}, [authBoolean, nav]);

	return (
		<>
			<h1>Sign up</h1>
			{signUpSuccess}
			<form
				onSubmit={(e) => {
					const privateData = {
						...userObject,
						photoURL: photoURL,
					};
					doSignUp(e)(dispatch)(setSignUpSuccess)(privateData);
				}}>
				<input
					type="username"
					name="displayName"
					placeholder="username"
					onChange={(e) => handleField(e)}
				/>
				<input
					type="text"
					name="email"
					placeholder="email"
					onChange={(e) => handleField(e)}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={(e) => handleField(e)}
				/>
				<input
					type="password"
					name="passwordConfirm"
					placeholder="Confirm Password"
					onChange={(e) => handleField(e)}
				/>

				<FileUpload
					labelText="Upload Profile Picture"
					fileTypes="image"
					maxMB={2}
					callbackFunction={setPhotoURL}
				/>
				<button type="submit">Sign up</button>
			</form>
		</>
	);
}

export default SignUpPage;
