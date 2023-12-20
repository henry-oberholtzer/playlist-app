import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import FileUpload from './FileUpload'

const userDataInitState = {
    id: "",
    username: "",
    profilePicture: "",
    
}

function SignUpPage() {
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [userData, setUserData ] = useState(userDataInitState);

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const passwordConfirm = event.target.passwordConfirm.value;
    if (password === passwordConfirm) {        
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`)
          })
          .catch((error) => {
            setSignUpSuccess(`There was an error signing up: ${error.message}!`)
          });
    } else {
        setSignUpSuccess("Passwords don't match")
    }
  }

  return (
    <>
    <h1>Sign up</h1>
    {signUpSuccess}
    <form onSubmit={doSignUp}>
    <input
        type='username'
        name='username'
        placeholder='username' />
      <input
        type='text'
        name='email'
        placeholder='email' />
                 
      <input
        type='password'
        name='password'
        placeholder='Password' />
        <input
        type='password'
        name='passwordConfirm'
        placeholder='Confirm Password' />

      <FileUpload 
        labelText="Upload Profile Picture"
        fileTypes="image"
        maxMB={5}
      />
      <button type='submit'>Sign up</button>
      
    </form>
    </>
  )

}

export default SignUpPage;