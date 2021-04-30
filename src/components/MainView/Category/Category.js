import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../BreadCrumb/Breadcrumb';
import {Row, Col,Button} from 'react-bootstrap';
import { BsFillPlusCircleFill} from "react-icons/bs";
import CategoryTable from './CategoryTable'
import CategoryModal from '../../Modals/CategoryModal/CategoryModal';

const Category = () => {
  const [crumbs, setCrumbs] = useState(['Home', 'Category']);
  const selected = crumb => {
    console.log(crumb);
  }
  const [shows,handleShow]=useState(false)
  const closeModalHandler =()=> handleShow(false);
  return (
    <>
      <Row className="BreadcrumbStyle" >
                <Col md="12"  >
                    <Col md="10" className="float-left">
                        <Breadcrumb crumbs={crumbs} selected={selected}>
                        </Breadcrumb>
                    </Col>
                    <Col md="2" className="float-right">
                        <Button className="float-right ProductButton"onClick={()=>{
              handleShow(true)}}><BsFillPlusCircleFill /></Button>
                    </Col>
                </Col>
            </Row>
     
      <CategoryTable show={shows} /> 
 <CategoryModal shows={shows} close={closeModalHandler}/>  
    </>
  )
}
export default Category;