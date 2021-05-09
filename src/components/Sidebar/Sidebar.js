import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as s from './Sidebar.styles';
import './SidebarStyle.css';
import { FaBell, FaSearch, FaPalette } from "react-icons/fa";
import * as AllColors from '../../colors';
import Footer from '../Footer/Footer';

const colors_sets = [

  { name: AllColors.dejaVu, color_type: "dejaVu" },
  { name: AllColors.swampy, color_type: "swampy" },
  { name: AllColors.pinkAndBlue, color_type: "pinkAndBlue" },
  { name: AllColors.julyBlue, color_type: "julyBlue" },
  { name: AllColors.preDark, color_type: "preDark" },
  { name: AllColors.brown, color_type: "brown" },
  { name: AllColors.silver, color_type: "silver" }
];

const Sidebar = props => {
  const {
    backgroundImage = '',
    sidebarHeader = {
      fullName: '',
      shortName: ''
    },
    menuItems = [],
    fonts = {
      header: '',
      menu: ''
    },
  } = props;
  const colorPalette = props.colorPalette;


  const [selectedColor, setSelectedColor] = useState([colors_sets[3].name])
  // console.log(selectedColor);
  const [selected, setSelectedMenuItem] = useState(menuItems[0].name);
  // console.log(selected);
  const [isSidebarOpen, setSidebarState] = useState(true);
  const [header, setHeader] = useState(sidebarHeader.fullName);
  const [visible, setVisible] = useState("show");
  //for bringing all the colors in here

  // Effects

  // Set selected menu item based on URL pathname
  useLayoutEffect(() => {

    const path = window.location.pathname;
    // console.log(path);
    const parts = path.split('/');
    // console.log(parts);
    // console.log(parts[1].charAt(0).toUpperCase());

    if (path !== '/' && parts[1].charAt(0).toUpperCase() !== menuItems[0].name) {
      // console.log( parts[1].charAt(0).toUpperCase());
      const selectedItem = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
      // console.log('here');
      setSelectedMenuItem(selectedItem)
    }
  }, [menuItems])

  // Update of header state
  useEffect(() => {
    isSidebarOpen ? setTimeout(() => setHeader(sidebarHeader.fullName), 200) : setHeader(sidebarHeader.shortName);
  }, [isSidebarOpen, sidebarHeader])


  // Update of sidebar state
  useEffect(() => {

    const updateWindowWidth = () => {
      if (window.innerWidth < 1280) {
        // console.log('more'); 
        setSidebarState(false);
      }

      else {
        // console.log(window.innerWidth);
        setSidebarState(true)
      }

    }

    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [isSidebarOpen]);



  // Set selected submenu if user landed on one




  const ShowOrHideDiv = (e) => {
    if (visible === 'show') {
      setVisible('not_show');
    }
    else if (visible === "not_show") {
      setVisible('show');
    }
  }

  const ChangeColorFunction = (ColorName) => {
    // console.log(ColorName);
    colors_sets.map((index, i) => {

      if (index.color_type === ColorName) {
        setSelectedColor([index.name])
        // console.log(index[i]);
      }

    })
  }

  const menuItemsJSX = menuItems.map((item, index) => {
    const isItemSelected = selected === item.name;

    return (
      <s.ItemContainer key={index}>
        <Link to={item.to} style={{ textDecoration: 'none' }}>
          <s.MenuItem
            font={fonts.menu}
            selected={isItemSelected}
            isSidebarOpen={isSidebarOpen}
            colorPalette={colorPalette}
          >
            <s.Icon isSidebarOpen={isSidebarOpen} src={item.icon} />
            <s.Text isSidebarOpen={isSidebarOpen}>{item.name}</s.Text>
          </s.MenuItem>
        </Link>
        </s.ItemContainer>

    )
  });

  return (
        <>

          <s.SidebarContainer backgroundImage={backgroundImage} isSidebarOpen={isSidebarOpen} colorPalette={colorPalette}>
            <s.SidebarHeader font={fonts.header}>{header}</s.SidebarHeader>
            <s.MenuItemContainer>{menuItemsJSX}</s.MenuItemContainer>
            <s.TogglerContainer onClick={() => setSidebarState(!isSidebarOpen)}>
              <s.Toggler />
            </s.TogglerContainer>
          </s.SidebarContainer>
          <Footer backgroundImage={backgroundImage} isSidebarOpen={isSidebarOpen} colorPalette={colorPalette} ></Footer>
        </>

  )
}

export default Sidebar