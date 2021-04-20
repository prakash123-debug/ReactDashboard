import React from 'react';
import * as s from './App.styles';
import * as Palette from './colors'
import { Container,Row,Col } from 'react-bootstrap';
import Header from './components/Header/Header'
import Login from './components/Login/Login'

// Components
import Sidebar from './components/Sidebar/Sidebar';
import MainView from './components/MainView/MainView'
const App = () => {
  const backgroundImage = 'images/mountain.jpg';
  const sidebarHeader = {
    fullName: 'Bootwal R&D',
    shortName: 'R&D'
  };

  const menuItems = [
    {name: 'Home', to: '/', icon: '/icons/home.svg', subMenuItems: [] },
    {name:'Products',to :'/products', icon:'/icons/home.svg',subMenuItems:[]},
    {name: 'About', to: '/about', icon: '/icons/about.svg', subMenuItems: [] },
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
    {/* <Login/> */}
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
      <MainView />
    </s.App>
    </>
  );
}

export default App;
