import React,{useRef,useState,useEffect} from 'react';
import './HeaderStyle';
import { HeaderContainer } from '../Sidebar/Sidebar.styles';
import { Container,Row,Col,Button} from 'react-bootstrap';
import {  FaSearch,FaBell,FaEnvelope,FaLightbulb,FaPowerOff } from "react-icons/fa";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import LogOut from '../Login/LogOut'
import './HeaderStyle.css'

const Header = (props)=>{
    const [OpenDeleteModal, handleOpenDeleteModal] = useState(false);
    const closeDeleteModalHandler = () => handleOpenDeleteModal(false);
    const [CurrentTime,SetCurrentTime]=useState([])
    const[CurrentStatus,SetCurrentStatus]=useState()
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
    const UpdateTime=()=>{
        let time=new Date().toLocaleTimeString();
       let latestTime = time.substring(0, time.length - 2);
        let AmOrPm = time.slice(-2);
        if(AmOrPm=='AM')
        {
            SetCurrentStatus('Good Morning')
        }
        else
        {
            SetCurrentStatus('Good Afternoon')
        }
        SetCurrentTime(latestTime);

    }
    setInterval(UpdateTime,1000);
 


    const { 
        backgroundImage = '', 
        colorPalette=''
      } = props;
    return (
       
        <Container>
             
        <HeaderContainer  backgroundImage={backgroundImage}  colorPalette={colorPalette}>
            <Row>
            {/* <Col md="1" className="mt-2">
                        <Button className="float-right d-none"><FaBell/></Button>

             </Col> */}
{/*             
         <Col md="4" className="h-100">
            <div className="input-group d-flex p-2">
            <div className="form-outline">
                <input type="search" id="form1" className="form-control" />
            </div>
            <button type="button" className="btn float-right btn-primary">
                <FaSearch/>
            </button>
         </div>
         </Col> */}
         <Col md="2" className="TimeStyle">
             <h4 className="float-right p-2">{CurrentTime}</h4>
         </Col>
         <Col md="10">
         <div className="container p-2">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>{CurrentStatus} ,Superadmin</span>
          <img style={{height:"30px"}}
            src="/user.png"
            alt="User avatar"
          />
        </button>
    
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
              <a href="#"><FaEnvelope/>&nbsp;&nbsp;&nbsp;&nbsp; Messages</a>
            </li>
            <li>
              <a href="#"><FaLightbulb/>&nbsp;&nbsp;&nbsp;&nbsp;Tips</a>
            </li>
            <li onClick={()=>{ handleOpenDeleteModal(true)}}>
              <a href="#"><FaPowerOff/> &nbsp;&nbsp;&nbsp;&nbsp; logout</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
         </Col>
         </Row>
         <LogOut shows={OpenDeleteModal}  close={closeDeleteModalHandler} />
        </HeaderContainer>
        
        </Container>
    )
}
export default Header;