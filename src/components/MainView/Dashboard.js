import React,{useState} from 'react';
import * as s from '../../App.styles';
import * as Palette from '../../colors'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar';
import {withRouter} from "react-router-dom";
import MainView from './MainView';
import { Switch, Route } from 'react-router-dom';


//components

import About from './About/About';
import Destinations from './Destinations/Destinations';
import Country from './Destinations/Country/Country';
import Blog from './Blog/Blog';
import Services from './Services/Services';
import Contacts from './Contacts/Contacts';
import Products from './Products/Products';


const Dashboard = ({history,location,match}) => {
  // console.log(history);
  // console.log(location);
  console.log(match);
  const backgroundImage = 'images/mountain.jpg';
  const sidebarHeader = {
    fullName: 'Bootwal R&D',
    shortName: 'R&D'
  };

  const menuItems = [
    {name: 'Home', to: '/', icon: '/icons/home.svg', subMenuItems: [] },
    {name:'Products',to :'dashboard/products', icon:'/icons/home.svg',subMenuItems:[]},
    {name: 'About', to: 'dashboard/about', icon: '/icons/about.svg', subMenuItems: [] },
    {name: 'Destinations', to: '/destinations', icon: '/icons/destinations.svg', 
      subMenuItems: [
        { name: 'Canada', to: '/canada'},        
        { name: 'Brazil', to: '/brazil'},
        { name: 'India', to: '/india'},
        { name: 'Australia', to: '/australia'},
        { name: 'Kenya', to: '/kenya'},
        { name: 'Moldova', to: '/moldova'}
      ] },
    {name: 'Blog', to: '/blog', icon: '/icons/blog.svg', subMenuItems: [] },
    {name: 'Services', to: '/services', icon: '/icons/services.svg', subMenuItems: [] },
    {name: 'Contacts', to: '/contacts', icon: '/icons/contacts.svg', subMenuItems: [] }
  ];

  const fonts = {
    header: 'ZCOOL KuaiLe',
    menu: 'Poppins'
  }
  return (
  
    <>
    <Header   backgroundImage={backgroundImage}
        sidebarHeader={sidebarHeader}
        menuItems={menuItems}
        fonts={fonts}
        colorPalette={Palette.julyBlue} ></Header>
     <s.App>
      
      <Sidebar
        backgroundImage={backgroundImage}
        sidebarHeader={sidebarHeader}
        menuItems={menuItems}
        fonts={fonts}
        colorPalette={Palette.julyBlue}
      />
        <Switch>
      <Route exact path={`${match.path}/products`} component={Products} />
      <Route exact path={`${match.path}/about`} component={About} />
      <Route exact path={`${match.path}/destinations`} component={Destinations} />
      <Route exact path={`${match.path}/destinations/:country`} component={Country} />
      <Route exact path={`${match.path}/destinations/:country`} component={Blog} />
      <Route exact path='/services' component={Services} />
      <Route exact path='/contacts' component={Contacts} />
    </Switch>

  {/* <MainView/> */}
    </s.App>
    </>
  )
}

export default withRouter(Dashboard);