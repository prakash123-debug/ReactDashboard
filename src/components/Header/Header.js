import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import * as s from './Sidebar.styles';
import './HeaderStyle';
import { HeaderContainer } from '../Sidebar/Sidebar.styles';
import { Container,Row,COl } from 'react-bootstrap';


const Header = (props)=>{
    const { 
        backgroundImage = '', 
        fonts='',
        isSidebarOpen='',
        colorPalette=''
      } = props;
    return (
        <Container>
        <HeaderContainer  backgroundImage={backgroundImage} isSidebarOpen={isSidebarOpen} colorPalette={colorPalette}>
        </HeaderContainer>
        </Container>

    )
}
export default Header;