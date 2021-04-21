import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Login from './components/Login/Login'
import Home from './components/MainView/Home/Home';
import About from './components/MainView/About/About';
import Destinations from './components/MainView/Destinations/Destinations';
import Country from './components/MainView/Destinations/Country/Country'
import Blog from './components/MainView/Blog/Blog';
import Services from './components/MainView/Services/Services';
import Contacts from './components/MainView/Contacts/Contacts';
import Products from './components/MainView/Products/Products'

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login}></Route>
      <Route exact path='/dashboard' component={Home} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/about' component={About} />
      <Route exact path='/destinations' component={Destinations} />
      <Route exact path='/destinations/:country' component={Country} />
      <Route exact path='/blog' component={Blog} />
      <Route exact path='/services' component={Services} />
      <Route exact path='/contacts' component={Contacts} />
    </Switch>
  )
}

export default Routes