import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doSignIn } from './general-functions';
import './css/LogInPage.css';

function LogInPage() {
	const [signInSuccess, setSignInSuccess] = useState(null);
	const dispatch = useDispatch();

	return (
		<React.Fragment>
			<form onSubmit={(e) => doSignIn(e)(dispatch)(setSignInSuccess)}>
				<input
					type="text"
					name="signinEmail"
					placeholder="email"
				/>
				<input
					type="password"
					name="signinPassword"
					placeholder="Password"
				/>
				<br></br>
				<button
					id="signInButton"
					className="button"
					type="submit">
					Sign in
				</button>
				{signInSuccess}
				<h2>Or</h2>
			</form>
			<Link to="/sign-up">
				<li
					id="createAccountButton"
					className="button">
					Create an Account
				</li>
			</Link>
		</React.Fragment>
	);
}

export default LogInPage;
