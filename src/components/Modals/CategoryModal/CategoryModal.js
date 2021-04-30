import React,{useState,useEffect,useLayoutEffect} from 'react';
import { Container,Row,Col,Table,Button,Modal} from 'react-bootstrap';
import { useFormik } from 'formik';
import axiosInstance from '../../Helpers/Axios'
import {BsListUl } from "react-icons/bs";

const validate = values => {
    const errors = {};
    if (!values.category_name) {
      errors.category_name = 'Category field is required';
    }
    return errors;
  };

const CategoryModal=({shows,close})=>{
    const [notification, setbackenderror] = useState(false);
    const [btnDisable,SetbtnDisabled]=useState(false);
    const [access_token, setAccessToken] = useState('');
    
  useEffect(() => {
    if (localStorage.token) {
      setAccessToken(localStorage.token)
    }
    if(btnDisable)
    {
        const timer = setTimeout(() => {
            SetbtnDisabled(false)
          }, 5000);
    }
    if(notification)
        {
            const timers = setTimeout(() => {
                setbackenderror(false)
              }, 4000);
        }
  });
  const formik = useFormik({
    initialValues: {
        category_name: ''
          },
    validate,
    onSubmit: async values => {
      
      const data = {
        categoryName: values.category_name,
      }
      await axiosInstance.post('/api/category', data, {
        headers: {
          'Authorization': `token ${access_token}`
        }
      })
        .then(res => {
          SetbtnDisabled(true)
          setbackenderror(true)  
        })
        .catch((error) => {
        });
    },
  });

 return(
     <>  
         <Modal
        show={shows}
        onHide={close}
        backdrop="static"
        keyboard={false}
      >
         {notification ? (
        <div className='alert  float-right position-absolute  w-40 alert-success alert-dismissible'>
          <strong>success!</strong> Data Inserted Sucessfully
          <button type="button" onClick={() => { setbackenderror(false) }} className="close" data-dismiss="alert">&times;</button>
        </div>
      ) : null}
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>
            <Modal.Title>Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="block-content">
              <div className="form-group">
                <label for="w-10">Category Name</label><sup className="text-danger">*</sup>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <BsListUl />
                    </span>
                  </div>
                  <input type="text"
                    className="form-control"
                    name="category_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                 value={formik.values.category_name} 
                 autoComplete="off"
                    placeholder="Please enter a name" />
                </div>
              </div>
            </div>
            {formik.touched.category_name && formik.errors.category_name ? (
              <div> <span className="error">{formik.errors.category_name}</span><br></br></div>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={close}>
              Close
          </Button>
            <Button type="submit" disabled={btnDisable} variant="primary">Submit</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
    )
       }

export default CategoryModal