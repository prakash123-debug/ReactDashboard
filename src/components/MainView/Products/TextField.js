import React from 'react'
import {ErrorMessage,useField} from 'formik'
// import { Col,Row } from 'react-bootstrap';
import './ProductsStyle.css'
import { Container,Row,Col,Form,InputGroup,FormControl,Modal} from 'react-bootstrap';
import { BsFillPlusCircleFill,BsPersonFill } from "react-icons/bs";


// import { MenuItem } from '../../Sidebar/Sidebar.styles';

const TextField=({label,...props})=>{
    const [field,meta] =useField(props);
    // console.log(field,meta);
    // console.log(label);
    return(
    //     <div class="input-group input-group-sm mb-3">
    //     <div class="input-group-prepend">
    //       <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
    //     </div>
    //     <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
    //   </div>
    <>
    <div className='input-group  mb-3'>

        <div className="input-group-prepend">
            <span className="input-group-text" id='basic-addon1'><BsPersonFill></BsPersonFill></span>
        </div>
        <input  className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'} `}   aria-label="Small" aria-describedby="Username"></input>
       
    </div>
  <span className="error mb-5">
  <ErrorMessage name={field.name} />
  </span>
      </>  


  
          /* <Col md="12">
          <label htmlFor={field.name}>{label}</label>
          <input 
          className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'} `}
          {...field} {...props}
          autoComplete="off"
          />
        <span className="error mb-5">
          <ErrorMessage name={field.name} />
          </span>
          </Col> */
     
    )
}
export default TextField