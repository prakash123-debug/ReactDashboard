import React, { useState} from 'react';
import Breadcrumb from '../../BreadCrumb/Breadcrumb';
import {Row, Col,Button} from 'react-bootstrap';
import { BsFillPlusCircleFill} from "react-icons/bs";
import PlacesModal from '../../Modals/PlacesModal/PlacesModal';
import PlacesTable from '../../Tables/PlaceTable/PlacesTable';
import {Link} from 'react-router-dom';

const Places = () => {
  const [crumbs, setCrumbs] = useState(['Home', 'Places']);
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
                        {/* <Button className="float-right ProductButton"onClick={()=>{
              handleShow(true)}}><BsFillPlusCircleFill /></Button> */}
              <Link to="/dashboard/places/addPlace"><Button className="float-right ProductButton"><BsFillPlusCircleFill/></Button></Link>
                    </Col>
                </Col>
            </Row>
     
      <PlacesTable show={shows} />  
 <PlacesModal shows={shows} close={closeModalHandler}/>  
    </>
  )
}
export default Places;