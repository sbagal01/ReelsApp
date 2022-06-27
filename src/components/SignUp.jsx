import React,{useState} from 'react';
import {auth,db } from '../firebase';
import { createUserWithEmailAndPassword} from 'firebase/auth';

import { collection, addDoc, setDoc,doc} from "firebase/firestore"; 


function SignUp() {
  let [email,setEmail]=useState("");
  let [password,setPassword]=useState("");
  let [fullName,setFullName]=useState("");
  let [loader,setLoader]=useState(false);
  let [error,setError]=useState("");
  let [user,setUser]=useState("");

  const trackEmail=function (e){
    setEmail(e.target.value);
  }
  const trackPassword=function (e){
    setPassword(e.target.value);
    
  }
  const trackName=function (e){
    setFullName(e.target.value);
    
  }
  
  async function processSignUp(){
    try{
      //alert(email+" "+password);
    setLoader(true);
    let userCred=await createUserWithEmailAndPassword(auth,email,password);

    // const docRef= await addDoc(collection(db,"users"),{
    //   email,
    //   fullName,
    //   reelsIds: [],
    //   profileImgUrl: "",
    //   userId: userCred.user.uid
    // });

      await setDoc(doc(db,"users",userCred.user.uid),{
        email,
        fullName,
        reelsIds: [],
        profileImgUrl: "",
        userId: userCred.user.uid
      });

    //console.log(userCred.user);
    setUser(userCred.user);
    }
    catch(err){
      setError(err.message);
      setTimeout(()=>{
        setError("")
      },2000)
    }
    setLoader(false);
  }
  
  return (<>
    {
    error!=""?<h1>Error is :{error}</h1>:
      loader==true?<h1>...Loading</h1>:
      user!=""?
    <>
    <h1>signed up user is  {user.uid}</h1>
    </>:
    <>   
    <input type="email" onChange={trackEmail} value={email} placeholder="Enter Email"></input>
    <br/>
    <div>Enter Pasword</div>
    <input type="password" onChange={trackPassword} value={password} placeholder="Password"></input>
    <br/>
    <input type="text" onChange={trackName} value={fullName} placeholder="FullName"></input>
    <br/>
    <button type="click" onClick={processSignUp}>SIGN UP</button>
    
    </>
    }
    </>
  )
}

export default SignUp