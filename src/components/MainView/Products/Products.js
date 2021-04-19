import React,{useState,useEffect} from 'react';
import Breadcrumb   from '../../BreadCrumb/Breadcrumb';
import { Container,Row,Col,Table,Button,Modal} from 'react-bootstrap';
import { BsFillPlusCircleFill,BsPersonFill } from "react-icons/bs";
import { Formik,Form } from 'formik';
import TextField from './TextField';
import * as Yup from 'yup'

import './ProductsStyle.css'
const Products =()=>{
    const validate=Yup.object({
        FirstName:Yup.string()
        .max(10,'Must be 15 character or less')
        .required('Required'),
        LastName:Yup.string()
        .max(10,'Must be 10 character').
        required('Required'),
        email:Yup.string()
        .required('Require'),
        password:Yup.string()
        .min('5','must be greater than 15 character')
        .max('20','only 20 character are available'),
        confirmPassword:Yup.string()
       .oneOf([Yup.ref('password'),null],'password must be same')
       .required('confirm password is required')
    })
    const [crumbs,setCrumbs]=useState(['Home','Products']);
    const selected=crumb=>{
        console.log(crumb);
    }
     const [lgShow, setLgShow] = useState(false);

    return(
        <>
       
        <Row className="BreadcrumbStyle" >
            <Col md="12"  >
              <Col md="10" className="float-left">
           <Breadcrumb crumbs={crumbs} selected={selected}>
           </Breadcrumb>
           </Col>
           <Col md="2" className="float-right">
           <Button  className="float-right ProductButton" onClick={() => setLgShow(true)}><BsFillPlusCircleFill/></Button>
           </Col>
           </Col>
        </Row>
        <Row className="BreadcrumbStyle mt-4">
            <Col>
            {/* <Button  className="float-right" variant="primary" onClick={handleShow}>
            <BsFillPlusCircleFill/>
            </Button> */}
            </Col>

            <Table striped bordered hover className="table table-responsive w-100 d-block d-md-table">
                    <thead>
                        <tr>
                        <th>SN</th>
                        <th>Product Name</th>
                        <th>Category Name</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
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
           Products
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <Form> */}
  {/* <Form.Row className="align-items-center">
    
    <Col xs="auto m-1" md="12">
      <Form.Label htmlFor="inlineFormInputGroup" srOnly>
        Username
      </Form.Label>
      <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text><BsPersonFill></BsPersonFill></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl id="inlineFormInputGroup" placeholder="Products Name" />
      </InputGroup>
    </Col>
    
    <Col xs="auto m-1" md="12">
    <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label htmlFor="inlineFormInputGroup" srOnly>
        Username
      </Form.Label>
      <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text><BsPersonFill></BsPersonFill></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl as="select">
          <option>Select Categories</option>
        <option>Shirts</option>
      <option>Pants</option>
      <option>Sorts</option>
      <option>Jeans</option>
          </FormControl>
      </InputGroup>
  </Form.Group>
    </Col>
    <Formik>

    </Formik>
  
    
    
    <Col xs="auto m-1" md="12">
      <Button type="submit" className="mb-2">
        Submit
      </Button>
    </Col>
  </Form.Row>
</Form> */}

    <Formik
    initialValues={{
      firstName:"",
      LastName:"",
      email:"",
      password:"",
      confirmPassword:"",
    }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 1000);}}
    validationSchema={validate}
    
    >
      {
        formik=>(
        <div>
          <form>
        {/* {console.log(formik.values)} */}
            <TextField label="First Name" name="FirstName" type="text"/>
            <TextField label="Last Name" name="LastName" type="text"/>
            <TextField label="email" name="email" type="email"/>
            <TextField label="Password" name="password" type="password"/>
            <TextField label="Confirm Password" name="confirmPassword" type="password"/>
            <button className="btn btn-dark mt-3"  type="submit">Submit</button>
            </form>
        </div>
        )
          
        }
      
    </Formik>



        </Modal.Body>
      </Modal>
           

    
    </>
     
    )
}
export default Products;