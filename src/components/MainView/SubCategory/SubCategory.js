import React, { useState} from 'react';
import Breadcrumb from '../../BreadCrumb/Breadcrumb';
import {Row, Col,Button} from 'react-bootstrap';
import { BsFillPlusCircleFill} from "react-icons/bs";
import SubCategoryTable from '../../Tables/SubCategoryTable/SubCategoryTable'
import SubCategoryModal from '../../Modals/SubCategoryModal/SubCategoryModal';

const SubCategory = () => {
  const [crumbs, setCrumbs] = useState(['Home', 'SubCategory']);
  const selected = crumb => {
    console.log(crumb);
  }
  const [shows,handleShow]=useState(false)
  const closeModalHandler =()=> handleShow(false);
  return (
    <>
      <Row className="BreadcrumbStyle BreadcrumbTitle" >
                <Col md="12"  >
                    <Col md="10" className="float-left">
                        <Breadcrumb crumbs={crumbs} selected={selected}>
                        </Breadcrumb>
                    </Col>
                    <Col md="2" className="float-right mt-2">
                        <Button className="float-right ProductButton"onClick={()=>{
              handleShow(true)}}><BsFillPlusCircleFill /></Button>
                    </Col>
                </Col>
            </Row>
     
      <SubCategoryTable show={shows} />  
 <SubCategoryModal shows={shows} close={closeModalHandler}/>  
    </>
  )
}
export default SubCategory;