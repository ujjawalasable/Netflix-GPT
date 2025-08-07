import React from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {auth} from "../utils/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useEffect } from 'react';
import { LOGO } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () =>{
  signOut(auth)
  .then(()=>{
    navigate("/");
  })
  .catch((error) => {
     navigate("/error");
  });
};

  
 useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth, (user)=>{
    if(user){
      // User is signed in see docs for a list of available properties
      const {uid, email, displayName, photoURL} = user;
      dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL:photoURL}));
      navigate("/browse");
    }
    else{
      // User is signed out
      dispatch(removeUser());
      navigate("/");
    }
   });
 return () => unsubscribe(); // Clean up the listener when component unmounts
}, [dispatch, navigate]);

  return (
    <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
       <img 
       className='w-44'
       src= {LOGO}
       alt="logo"
       />
       {user && (<div className='flex p-2'>
        <img
         className='w-12 h-12 rounded full'
         alt="usericon"
         //src="https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
          src= {user.photoURL || "https://avatars.githubusercontent.com/u/12824231?v=4"}
         />
         <button onClick= {handleSignOut} className='font-bold text-white'>(Sign Out)</button>
       </div>)
       }
    </div>
  )
}

export default Header
