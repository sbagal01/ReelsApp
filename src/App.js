import React,{useContext} from 'react';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {Route,Switch,Redirect} from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import { AuthContextProvider,AuthContext} from './context/AuthContext';
function App() {
  return (<>
    
        {/* <div>Reels Project</div> */}
        {/* if we do not give switch command then which ever link  will give whoever satisfies the condition will gwet printed.For eg: if we give/signup then signup and Pagenot found will be satisfied. so both of them will get printed.In order to avoid multiple components satisfying the conditions, we wrap everything under switch statement. */}
    <AuthContextProvider>
    <Switch>
          <RedirectToFeed path="/signup" comp={SignUp}>
          </RedirectToFeed>
          <RedirectToFeed path="/login" comp={Login}>
          </RedirectToFeed>
          <PrivateRoute path="/feed" comp={Feed}>

          </PrivateRoute>
          <PrivateRoute path="/profile" comp={Profile}>

          </PrivateRoute>
          <Redirect from="/" to="/feed"></Redirect>
          <Route>
              <PageNotFound></PageNotFound>
          </Route>
          
    </Switch>
    </AuthContextProvider>

  </>  
    

  )
}
function RedirectToFeed(props){
    console.log("Feed Route", props)
    let Component=props.comp;
    let cUser=useContext(AuthContext);
    return(
    <Route {...props}
    render={(props)=>{
        //logic
        return (cUser!=null?<Redirect {...props} to="/feed"></Redirect>:
            <Component {...props}></Component>        
            )
    }}
    ></Route>)
}

function PrivateRoute(props){
    console.log("private Route", props)
    let Component=props.comp;
    let cUser=useContext(AuthContext);
    return(
    <Route {...props}
    render={(props)=>{
        //logic
        return (cUser==null?<Redirect {...props} to="/login"></Redirect>:
            <Component {...props}></Component>        
            )
    }}
    ></Route>)
}
export default App;
