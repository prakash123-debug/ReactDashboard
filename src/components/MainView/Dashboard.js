import React,{useState} from 'react';
import * as s from '../../App.styles';
import * as Palette from '../../colors'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar';
import {withRouter} from "react-router-dom";
import MainView from './MainView';
import { Switch, Route } from 'react-router-dom';

import * as sa from './MainView.styles';

//components

import About from './About/About';
import Destinations from './Destinations/Destinations';
import Country from './Destinations/Country/Country';
import Blog from './Blog/Blog';
import Services from './Services/Services';
import Contacts from './Contacts/Contacts';
import Home from './Home/Home';
import Category from './Category/Category';
import SubCategory from './SubCategory/SubCategory'
import Places from './Places/Places'

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
    {name: 'Home', to: `${match.path}`, icon: '/icons/home.svg', subMenuItems: [] },
    {name: 'Category', to: `${match.path}/category`, icon: '/icons/home.svg', subMenuItems: [] },
    {name:'SubCategory',to :`${match.path}/subcategory`, icon:'/icons/home.svg',subMenuItems:[]},
    {name:'Places',to :`${match.path}/places`, icon:'/icons/home.svg',subMenuItems:[]},
    {name: 'About', to: `${match.path}/about`, icon: '/icons/about.svg', subMenuItems: [] },
    {name: 'Destinations', to: '/destinations', icon: '/icons/destinations.svg', 
      subMenuItems: [
        { name: 'Canada', to: '/canada'},        
        { name: 'Brazil', to: '/brazil'},
        { name: 'India', to: '/india'},
        { name: 'Australia', to: '/australia'},
        { name: 'Kenya', to: '/kenya'},
        { name: 'Moldova', to: '/moldova'}
      ] },
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
         <sa.MainViewContainer>
        <Switch>
      <Route exact path={`${match.path}`} component={Home} />
      <Route exact path={`${match.path}/category`} component={Category} />
      <Route exact path={`${match.path}/subcategory`} component={SubCategory} />
      <Route exact path={`${match.path}/places`} component={Places} />
      <Route exact path={`${match.path}/about`} component={About} />
      <Route exact path={`${match.path}/destinations`} component={Destinations} />
    </Switch>

    </sa.MainViewContainer>

    </s.App>
    </>
  )
}

export default withRouter(Dashboard);