import React, { useState} from 'react';
import Breadcrumb from '../../BreadCrumb/Breadcrumb';
import {Row, Col,Button} from 'react-bootstrap';
import { BsFillPlusCircleFill} from "react-icons/bs";
import TagTable from '../../Tables/TagTable/TagTable'
import TagModal from '../../Modals/TagModal/TagModal';

const Tag = () => {
  const [crumbs, setCrumbs] = useState(['Home', 'Tags']);
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
     
      <TagTable show={shows} />  
 <TagModal shows={shows} close={closeModalHandler}/>  
    </>
  )
}
export default Tag;