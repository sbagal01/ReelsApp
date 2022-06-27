import React,{useContext,useState,useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./profile.css"
function Profile() {
  let cuser=useContext(AuthContext);
  let [pageLoading,setPageLoading]=useState(true);
  let [user, setUser] = useState();
  // return (
  //   <>
  //     <div className="header"></div>
  //     <div className="main">
  //       <div className="pimg_container">

  //         <img src="http://via.placeholder.com/640x360" alt=""
  //           className="pimg" />
  //       </div>
  //       <div className="details">
  //         <div className="content">Jasbir  </div>
  //         <div className="content">No of Posts: <span
  //           className="bold_text"
  //         >Posts</span></div>
  //         <div className="content"
           
  //         >Email <span
  //         className="bold_text">Email.com</span></div>


  //       </div>
  //     </div>
  //   </>
  // )
  // useEffect((function fn(){
  //   (async function(){
  //     if(cuser){
  //       const docRef=doc(db,"user",cuser.uid);
  //       const docSnap=await getDoc(docRef);
  //       console.log("Document data : "+ docSnap.data());
  //     }
  //   })() 
  // })(),[cuser]);

    useEffect(function fun(){
      (async function(){
        const docRef = doc(db, "users", cuser.uid);
      const userObj = await getDoc(docRef);
      console.log("Document data:", userObj.data());
      setUser(userObj.data());
      setPageLoading(false);
      })()
    },[])


  return (
  <>
  {pageLoading==true?<div>...Loading</div>:
  

     <>
    <div className="header"></div>
     <div className="main">
     <div className="pimg_container">
         <img src={user.profileImgUrl} alt=""
          className="pimg" />
    </div>
      <div className="details">
        <div className="content">{user.fullName}</div>
        <div className="content">No. of Posts: {user.reelsIds.length} <span className="bold_text">Posts</span></div>
        <div className="content">Email: {user.email} <span className="bold_text"></span></div>
      </div>
    </div>

    </>
    }
    </>
  )
}

export default Profile