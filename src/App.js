import React,{useState,useEffect} from 'react';
import Login from './components/Login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



// Components
import Dashboard from './components/MainView/Dashboard'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
const App = () => {
const[isAuth,setisAuth]=useState(true)


  return (
    <>
    {/* <Login/> */}
    <Switch>
      <Route exact path='/' component={Login}></Route>
      <ProtectedRoute path='/dashboard' component={Dashboard} isAuth={isAuth} />

      {/* <Route exact path='/dashboard' component={Dashboard} /> */}

      </Switch>
    </>
  );
}

export default App;
