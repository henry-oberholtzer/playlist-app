import React, { useState } from "react";
import { auth } from "../firebase"
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
// import { handleFieldObjectChange } from "./form-functions";


function LogInPage() {
    const [signInSuccess, setSignInSuccess] = useState(null);
    const [signOutSuccess, setSignOutSuccess] = useState(null);
  
    function doSignIn(event) {
      event.preventDefault();
      const email = event.target.signinEmail.value;
      const password = event.target.signinPassword.value;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)
        })
        .catch((error) => {
          setSignInSuccess(`There was an error signing in: ${error.message}!`)
        });
    }
    function doSignOut() {
      signOut(auth)
        .then(function () {
          setSignOutSuccess("You have successfully signed out!");
        }).catch(function (error) {
          setSignOutSuccess(`There was an error signing out: ${error.message}!`);
        });
    }
  
    return (
      <React.Fragment>
        <h1>Sign In</h1>
        {signInSuccess}
        <form onSubmit={doSignIn}>
          <input
            type='text'
            name='signinEmail'
            placeholder='email' />
          <input
            type='password'
            name='signinPassword'
            placeholder='Password' />
          <button type='submit'>Sign in</button>
        </form>
        <Link to="/sign-up"><li className="button">Create an Account</li></Link>
        <h1>Sign Out</h1>
        {signOutSuccess}
        <br />
        <button onClick={doSignOut}>Sign out</button>
      </React.Fragment>
    );
  }
  
  export default LogInPage



// const LogInPage = () => {
//     const [logIn, setLogIn] = useState({
//         username: "",
//         password: "",
//     })
//     const handleField = handleFieldObjectChange(logIn)(setLogIn)

//     return(
//         <form>
//             <label htmlFor="username">User Name:</label>
//             <input type="text" name="username" id="username"
//             value={logIn.username}
//             onChange={(e) => handleField(e)}
//             ></input>
//             <label htmlFor="password">Password:</label>
//             <input type="password" name="password" id="password"
//             value={logIn.password}
//             onChange={(e) => handleField(e)}></input>
//             <button type="submit" onSubmit={(e) => handleField(e)}>Log In</button>
//         </form>
//     )
// }

// export default LogInPage;