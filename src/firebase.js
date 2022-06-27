//npm i firebase
//src-> create a new file
//signInwithemailpassword- it checks wheter the crdentils entered matches with credentials entered inside reels auth application we created in firebse
//npm list --depth=0 to check to check react version
import {initializeApp} from 'firebase/app';
import {getAuth} from "firebase/auth";
import secret from './secrets';
import { getFirestore } from "firebase/firestore";

let app=initializeApp(secret);  //file. where firebase .json file is created. In this case file is stored in firebase.js
export let auth=getAuth(app);
export const db = getFirestore(app);