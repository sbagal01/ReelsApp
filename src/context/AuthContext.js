import React,{useEffect, useState} from 'react';
import {auth} from '../firebase';
import {onAuthStateChanged} from "firebase/auth";

export const AuthContext=React.createContext();

export function AuthContextProvider({children}){
    let [mainLoader,setMainLoader]=useState(true);
    let [cUser,setCUser]=useState(null);

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setCUser(user);
            // ...
          } else {
            // User is signed out
            setCUser(null);
            // ...
          }
          setMainLoader(false);
      });
      return unsubscribe;
    },[]);
    let value=cUser;
    return (
        <AuthContext.Provider value={value}>
            {mainLoader==false && children}
        </AuthContext.Provider>
    )
}