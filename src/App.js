import React,{useState,useEffect} from 'react';
import Login from './components/Login/Login'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
// Components
import Dashboard from './components/MainView/Dashboard'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';


const App = () => {
  let history = useHistory();

  const[isAuth,setisAuth]=useState(false)

  useEffect(() => {
    if(localStorage.token)
    {
    setisAuth(true);
    history.push('/dashboard');

    }
    else
    {
      console.log('something');
    }
    });

    

  return (
    <>
    {/* <Login/> */}
    <Switch>
      <Route exact path='/' component={Login}></Route>
      <ProtectedRoute  path='/dashboard' component={Dashboard} isAuth={isAuth} />
      </Switch>
    </>
  );
}

export default App;
