import React,{useEffect, useState} from 'react';
import {auth} from '../firebase';// the login is inside components folder and firebase is inside src folder. so we use two dots
import {signInWithEmailAndPassword, signOut,onAuthStateChanged} from 'firebase/auth';

function Login() {
  let [email,setEmail]=useState("");
  let [password,setPassword]=useState("");
  let [user,setUser]=useState(null);
  let [loader,setLoader]=useState(false);
  let [error,setError]=useState("");
  let [mainLoader,setMainLoader]=useState(true);

  const trackEmail=function (e){
    setEmail(e.target.value);
  }
  const trackPassword=function (e){
    setPassword(e.target.value);
    
  }
  const printDetails= async function (){
    try{
      //alert(email+" "+password);
    setLoader(true);
    let userCred=await signInWithEmailAndPassword(auth,email,password);
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
  const signout=async function (){
    await signOut(auth);
    setUser(null);
  }
  //to check if the user is already logged in.Cause without this, on refresh the logged user is getting logged out.
  useEffect(()=>{
    let unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        // ...
      } else {
        // User is signed out
        setUser(null);
        // ...
      }
      setMainLoader(false);
  });
  return unsubscribe;
},[]);

  return (
    <>
    { mainLoader==true?<h1>...Page Loading</h1>:
      error!=""?<h1>Error is :{error}</h1>:
      loader==true?<h1>...Loading</h1>:
      user!=null?
      <>
      <button onClick={signout}>SignOut</button>
      <h1>user is {user.uid}</h1></>:
      <>
    <div> Enter Email</div>
    <input type="email" onChange={trackEmail} value={email} placeholder="Email"></input>
    <br/>
    <div>Enter Pasword</div>
    <input type="password" onChange={trackPassword} value={password} placeholder="Password"></input>
    <br/>
    <button type="click" onClick={printDetails}>LOG IN</button>
    </>
    }
    </>
    )

//     <div>
//       <form>
// <div class="mb-6">
// <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
// <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required=""/>
// </div>
// <div class="mb-6">
// <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
// <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required=""/>
// </div>
// <div class="mb-6">
// <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repeat password</label>
// <input type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required=""/>
// </div>
// <div class="flex items-start mb-6">
// <div class="flex items-center h-5">
// <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required=""/>
// </div>
// <label for="terms" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
// </div>
// <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
// </form>
//     </div>

  
}

export default Login