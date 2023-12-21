import { auth, db } from '../firebase';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	getAuth,
	updateProfile,
} from 'firebase/auth';
import {
	collection,
	addDoc,
	setDoc,
	getDocs,
	doc,
	where,
	query,
} from 'firebase/firestore';
import { logIn, logOut } from './redux/slices/userInterfaceSlice';

export const handleFieldObjectChange = (state) => {
	return (setStateFunction) => {
		return (event) => {
			setStateFunction({ ...state, [event.target.name]: event.target.value });
		};
	};
};

export const postToDatabase = (collectionDirectory) => {
	return async (object) => {
		await addDoc(collection(db, collectionDirectory), object);
	};
};

export const setToDatabase = (collectionDirectory) => {
	return (docID) => {
		return async (object) => {
			await setDoc(doc(db, collectionDirectory, docID), object);
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
					const user = userCredential.user;
					callbackFunction(
						`You've successfully signed in as ${user.displayName}!`
					);
					dispatchFunction(logIn());
					setToDatabase('users')(user.uid)({
						displayName: user.displayName,
						photoURL: user.photoURL,
					});
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
				const { email, password, passwordConfirm, photoURL, displayName } =
					userObject;
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
										`You've successfully signed up, ${userCredential.user.displayName}!`
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

export const doSignOut = (dispatchFunction) => {
	return (errorReturn) => {
		signOut(auth)
			.then(() => {
				dispatchFunction(logOut());
			})
			.catch((error) => {
				errorReturn(`There was an error signing out: ${error.message}!`);
			});
	};
};

export const fetchPlaylistData = (setPlaylistState) => {
	return (firstObjectProp) => {
		return (firstFilterOperator) => {
			return (firstValue) => {
				return (secondObjectProp) => {
					return (secondFilterOperator) => {
						return async (secondValue) => {
							const playlistDocs = [];
							let q;
							if (secondObjectProp && secondFilterOperator && secondValue) {
								q = query(
									collection(db, 'playlists'),
									where(firstObjectProp, firstFilterOperator, firstValue),
									where(secondObjectProp, secondFilterOperator, secondValue)
								);
							} else {
								q = query(
									collection(db, 'playlists'),
									where(firstObjectProp, firstFilterOperator, firstValue)
								);
							}

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
								setPlaylistState(playlistDocs);
							} catch (error) {
								console.error('Error fetching data:', error);
							}
						};
					};
				};
			};
		};
	};
};
