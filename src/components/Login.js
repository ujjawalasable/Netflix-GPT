import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleButtonClick = () => {
    
    const name = !isSignInForm && nameRef.current ? nameRef.current.value : '';
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    const validationError = checkValidData(name, email, password);
    setErrorMessage(validationError);
    if (validationError) return;

    if (!isSignInForm) {
      // Sign Up logic
      createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          const user = userCredential.user
          
          await updateProfile(user, {
            displayName: name,
            photoURL:USER_AVATAR,
          }).then(async()=>{
            await user.reload(); // 🔁 Refresh user info from Firebase

            const refreshedUser = auth.currentUser;
            const {uid, email, displayName, photoURL} = refreshedUser;
            dispatch(addUser({
              uid: uid, 
              email: email, 
              displayName: displayName,
              photoURL: photoURL
            }));
             navigate("/browse");
          }).catch((error)=>{
            //An error occurred
             setErrorMessage(error.message);
          });

          console.log('User signed up:', user);
          
        })
        .catch((error) => {
          console.log('Signup error:', error.code, error.message);
          setErrorMessage(error.message);
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('User signed in:', userCredential.user);
          
        })
        .catch((error) => {
          console.log('Signin error:', error.code, error.message);
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-3/12 my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>

        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            className="p-4 my-4 w-full bg-gray-700 rounded"
          />
        )}

        <input
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          className="p-4 my-4 w-full bg-gray-700 rounded"
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          autoComplete={isSignInForm ? 'current-password' : 'new-password'}
          className="p-4 my-4 w-full bg-gray-700 rounded"
        />

        {errorMessage && (
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        )}

        <button
          type="button"
          onClick={handleButtonClick}
          className="p-4 my-4 bg-red-700 w-full rounded-lg"
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>

        <p onClick={() => setIsSignInForm(!isSignInForm)} className="py-4 cursor-pointer">
          {isSignInForm
            ? 'New to Netflix? Sign Up Now'
            : 'Already registered? Sign In Now'}
        </p>
      </form>
    </div>
  );
};

export default Login;
