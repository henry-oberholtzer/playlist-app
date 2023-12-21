import { auth } from '../firebase';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	getAuth,
	updateProfile,
} from 'firebase/auth';
import { logIn, logOut } from './redux/slices/userInterfaceSlice';
import { useNavigate } from 'react-router-dom';

export const handleFieldObjectChange = (state) => {
	return (setStateFunction) => {
		return (event) => {
			setStateFunction({ ...state, [event.target.name]: event.target.value });
		};
	};
};

export const doSignIn = (event) => {
	return (dispatchFunction) => {
		return (callbackFunction) => {
			event.preventDefault();
			const email = event.target.signinEmail.value;
			const password = event.target.signinPassword.value;
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					callbackFunction(
						`You've successfully signed in as ${userCredential.user.email}!`
					);
					dispatchFunction(logIn());
				})
				.catch((error) => {
					callbackFunction(`There was an error signing in: ${error.message}!`);
				});
		};
	};
};

export const doSignUp = (event) => {
	return (dispatchFunction) => {
		return (callbackFunction) => {
			return (userObject) => {
				event.preventDefault();
				const email = userObject.email;
				const password = userObject.password;
				const passwordConfirm = userObject.passwordConfirm;
				const photoURL = userObject.photoURL;
				const displayName = userObject.displayName;
				if (password === passwordConfirm) {
					createUserWithEmailAndPassword(auth, email, password)
						.then((userCredential) => {
							const auth = getAuth();
							updateProfile(auth.currentUser, {
								displayName: displayName,
								photoURL: photoURL,
							})
								.then(() => {
									callbackFunction(
										`You've successfully signed up, ${userCredential.user.email}!`
									);
									dispatchFunction(logIn);
								})
								.catch((error) => {
									callbackFunction(
										`There was an error establishing your profile: ${error.message}!`
									);
								});
						})
						.catch((error) => {
							callbackFunction(
								`There was an error signing up: ${error.message}!`
							);
						});
				} else {
					callbackFunction("Passwords don't match");
				}
			};
		};
	};
};

export const doSignOut = () => {
	return (dispatchFunction) => {
		return (errorReturn) => {
			return (navigateFunction) => {
				return (navigateLocation) => {
					signOut(auth)
						.then(() => {
							dispatchFunction(logOut());
							navigateFunction(navigateLocation);
						})
						.catch((error) => {
							errorReturn(`There was an error signing out: ${error.message}!`);
						});
				};
			};
		};
	};
};
