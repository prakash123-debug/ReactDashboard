import React from 'react';
import * as s from '../../App.styles';
import * as Palette from '../../colors'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar';
import {withRouter} from "react-router-dom";
import { Switch, Route } from 'react-router-dom';

import * as sa from './MainView.styles';

//components

import Home from './Home/Home';
import Category from './Category/Category';
import SubCategory from './SubCategory/SubCategory'
import Places from './Places/Places'
import Tag from './Tag/Tag';
const Dashboard = ({history,location,match}) => {
  const backgroundImage = 'images/mountain.jpg';
  const sidebarHeader = {
    fullName: 'Bootwal R&D',
    shortName: 'R&D'
  };

  const menuItems = [ 
    {name: 'Home', to: `${match.path}`, icon: '/icons/home.svg'},
    {name: 'Category', to: `${match.path}/category`, icon: '/icons/home.svg'},
    {name:'SubCategory',to :`${match.path}/subcategory`, icon:'/icons/home.svg'},
    {name:'Places',to :`${match.path}/places`, icon:'/icons/home.svg'},
    {name:'tags',to :`${match.path}/tags`, icon:'/icons/home.svg'},
  ];

  const fonts = {
    header: 'ZCOOL KuaiLe',
    menu: 'Poppins'
  }
  return (
  
    <>
    <Header   backgroundImage={backgroundImage}
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
      <Route exact path={`${match.path}/tags`} component={Tag} />
    </Switch>

    </sa.MainViewContainer>

    </s.App>
    </>
  )
}

export default withRouter(Dashboard);