// import React,{useState,useEffect,useLayoutEffect} from 'react';
// import { Container,Row,Col,Table,Button,Modal} from 'react-bootstrap';
// import { useFormik } from 'formik';
// import axiosInstance from '../../Helpers/Axios'
// import {BsListUl } from "react-icons/bs";

// const validate = values => {
//     const errors = {};
//     if (!values.category_name) {
//       errors.category_name = 'Category field is required';
//     }
//     return errors;
//   };

// const CategoryModal=({shows,close})=>{
//     const [notification, setnotification] = useState(false);
//     const [btnDisable,SetbtnDisabled]=useState(false);
//     const [access_token, setAccessToken] = useState('');

//   useEffect(() => {
//     if (localStorage.token) {
//       setAccessToken(localStorage.token)
//     }
//     if(btnDisable)
//     {
//         const timer = setTimeout(() => {
//             SetbtnDisabled(false)
//           }, 5000);
//     }
//     if(notification)
//         {
//             const timers = setTimeout(() => {
//                 setnotification(false)
//               }, 4000);
//         }
//   });
//   const formik = useFormik({
//     initialValues: {
//         category_name: ''
//           },
//     validate,
//     onSubmit: async values => {

//       const data = {
//         categoryName: values.category_name,
//       }
//       await axiosInstance.post('/dashboard/category', data, {
//         headers: {
//           'Authorization': `token ${access_token}`
//         }
//       })
//         .then(res => {
//           SetbtnDisabled(true)
//           setnotification(true)  
//         })
//         .catch((error) => {
//         });
//     },
//   });

//  return(
//      <>  
//          <Modal
//         show={shows}
//         onHide={close}
//         backdrop="static"
//         keyboard={false}
//       >
//          {notification ? (
//         <div className='alert  float-right position-absolute  w-40 alert-success alert-dismissible'>
//           <strong>success!</strong> Data Inserted Sucessfully
//           <button type="button" onClick={() => { setnotification(false) }} className="close" data-dismiss="alert">&times;</button>
//         </div>
//       ) : null}
//         <form onSubmit={formik.handleSubmit}>
//           <Modal.Header>
//             <Modal.Title>Category</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="block-content">
//               <div className="form-group">
//                 <label for="w-10">Category Name</label><sup className="text-danger">*</sup>
//                 <div className="input-group">
//                   <div className="input-group-prepend">
//                     <span className="input-group-text">
//                       <BsListUl />
//                     </span>
//                   </div>
//                   <input type="text"
//                     className="form-control"
//                     name="category_name"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                  value={formik.values.category_name} 
//                  autoComplete="off"
//                     placeholder="Please enter a name" />
//                 </div>
//               </div>
//             </div>
//             {formik.touched.category_name && formik.errors.category_name ? (
//               <div> <span className="error">{formik.errors.category_name}</span><br></br></div>
//             ) : null}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={close}>
//               Close
//           </Button>
//             <Button type="submit" disabled={btnDisable} variant="primary">Submit</Button>
//           </Modal.Footer>
//         </form>
//       </Modal>
//     </>
//     )
//        }

// export default CategoryModal


import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import axiosInstance from '../../Helpers/Axios'
import { BsListUl } from "react-icons/bs";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({

  category_name: Yup.string()
    .min(5, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
});
const CategoryModal = ({ shows, close }) => {
  // const [notification, notificationError] = useState(false);
  const [btnDisable, SetbtnDisabled] = useState(false);
  const [access_token, setAccessToken] = useState('');
  const [notification, notificationError] = useState('');

  useEffect(() => {
    if (localStorage.token) {
      setAccessToken(localStorage.token)
    }
    if (btnDisable) {
      const timer = setTimeout(() => {
        SetbtnDisabled(false)
      }, 5000);
    }
    if (notification) {
      const timers = setTimeout(() => {
        notificationError(false)
      }, 4000);
    }
  });


  return (
    <>


      <Formik
        initialValues={{ category_name: "",categoryImage:""}}
        validationSchema={SignupSchema}

        onSubmit={async (values, actions) => {
          let formdata = new FormData();
          formdata.append('categoryName',values.category_name)
          formdata.append('categoryImage',values.categoryImage)
          // const data = {
          //   categoryName: values.category_name,
          // }

          await axiosInstance.post('/dashboard/category', formdata, {
            headers: {
              'Authorization': `token ${access_token}`
            }
          })
            .then(res => {
              SetbtnDisabled(true)
              notificationError(true)
            })
            .catch((error) => {
              console.log(error);
            });

          actions.resetForm({
            values: {
              category_name: '',
              categoryImage:''
            },
          });
        }}
      >
        {props => (
          <Modal
            show={shows}
            onHide={close}
            backdrop="static"
            keyboard={false}
          >
            {notification ? (
              <div className='alert w-40 alert-success alert-dismissible'>
                <strong>success!</strong> Data Updated Sucessfully
                <button type="button" onClick={() => { notificationError(false) }} className="close" data-dismiss="alert">&times;</button>
              </div>
            ) : null}
            <form onSubmit={props.handleSubmit}>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.category_name}
                        autoComplete="off"
                        placeholder="Please enter category name" />
                    </div>
                  </div>
                </div>
                <span className="error"><ErrorMessage name="category_name" /></span>

                <div className="block-content">
                    <div className="form-group">
                      <label for="w-10">Select Category Image</label><sup className="text-danger">*</sup>
                      <div className="input-group">
                        <input type="file"
                          name="categoryImage"
                          onChange={(event) => props.setFieldValue("categoryImage", event.target.files[0])}
                          onBlur={props.handleBlur}
                          multiple
                          autoComplete="off"
                          placeholder="Please enter category name"
                        />
                      </div>
                    </div>
                    <span className="error"><ErrorMessage name="categoryImage" /></span>

                  </div>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                  Close
                                    </Button>
                <Button type="submit" disabled={btnDisable} variant="primary" >Submit</Button>
              </Modal.Footer>
            </form>
          </Modal>

        )}
      </Formik>
    </>
  )


}

export default CategoryModal


