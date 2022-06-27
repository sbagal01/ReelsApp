import React,{useState} from 'react';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth';
import './Feed.css';
function Feed() {
  let [user,setUser]=useState(null);
  const signout=async function (){
    await signOut(auth);
    setUser(null);
  }
  return (
  <>
    <div className="header">
    <img src="
        https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png
        " alt="" className="insta_img" />
      <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" className="profile_img" />
    </div>
    <div className="main_container">
    <div className="upload_container">
    <i 
    className="movie_icon fa-solid fa-clapperboard">
    </i>
    <div className="upload_text">UPLOAD</div>
    </div>
    <div className="reels_container">Reels</div>
    </div>
    <button onClick={signout}>SignOut</button>
  </>
  )
}

export default Feed