import React,{useState,useEffect} from 'react';
import { FaWindows } from 'react-icons/fa';
import Breadcrumb   from '../../BreadCrumb/Breadcrumb';
import { Container,Row,Col,Table,Button,Modal} from 'react-bootstrap';
import { BsFillPlusCircleFill } from "react-icons/bs";

const Products =()=>{
    const [crumbs,setCrumbs]=useState(['Home','Products']);
    const selected=crumb=>{
        console.log(crumb);
    }
 
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);

    return(
        <>
       
        <Row className="justify-content-start noGutters" >
            <Col md="12">
           <Breadcrumb crumbs={crumbs} selected={selected}>
           </Breadcrumb>
           </Col>
        
         
        </Row>
        <Row>
            <Col>
            {/* <Button  className="float-right" variant="primary" onClick={handleShow}>
            <BsFillPlusCircleFill/>
            </Button> */}
    <Button className="float-right" onClick={() => setLgShow(true)}><BsFillPlusCircleFill/></Button>
            </Col>

            <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                    </Table>
                    </Row>
                    <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
           

    
    </>
     
    )
}
export default Products;