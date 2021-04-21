import React,{ useState, useEffect, useLayoutEffect }  from 'react';
import './LoginStyle.css'
import { FaUserAlt,FaKey } from "react-icons/fa";
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import axios from 'axios';


const validate = values => {
    const errors = {};
 
    if (!values.email) {
      errors.email = 'Email field is required';
    }
    //  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = 'Invalid email address';
    // }
    if (!values.password) {
        errors.password = 'Password field is required';
      // } else if (values.password.length <= 8) {
      //   errors.password = 'Must be greater than or equal to 8 characters';
      // }
    }
    
    
    return errors;
  };

const Login = ()=>{
  // const [Email,SetEmail]=useState('');
  // const [Password,SetPassword]=useState('');
  // const[allEntry,setAllEntry]=useState([]);
  const [backend_error,setbackenderror]=useState(false);

  // const submitform=()=>{
  //     const newEntry={email:Email ,password:Password};
  //     setAllEntry([...allEntry,newEntry]);
  //     console.log(allEntry);
  // }

    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validate,

        onSubmit: values => {
          const data={
            email:values.email,
            password:values.password
          }
          // console.log(data);
          axios.post('http://localhost:5000/api/user/login',data)
          .then(res=>{
            console.log(res.data.accessToken)
            localStorage.setItem('token',res.data.accessToken);
          })
          .catch((error) => {
            setbackenderror(true)
        });
          // console.log(values.email);
          
          // axios.post('https://reqres.in/api/articles', article)
          // .then(response => this.setState({ articleId: response.data.id }));
          //  submitform()
            
          // alert(JSON.stringify(values, null, 2));
        },
      });
   
   
    return (
      <>
      
             
             {backend_error? (
              <div className='alert col-md-6 float-right w-40 alert-warning alert-dismissible'>
          <strong>Warning!</strong> please enter valid credintals
                <button type="button" className="close" data-dismiss="alert">&times;</button>
          </div>
                  ) : null}
          

            

         
               
            <div className="container position-fixed ">
         
                <div className="d-flex  justify-content-center text-center h-100">
                    <div className="card">
                        <div className="card-header">
                        
                            <h3>Sign In</h3>
                            
                        </div>
                        <div className="card-body">
                        
                         
                            <form onSubmit={formik.handleSubmit}> 
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><FaUserAlt/></span>
                                    </div>
                                    <input type="text"
                                     className="form-control"
                                      name="email" 
                                      onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                     value={formik.values.email} 
                                     autoComplete="off"
                                      placeholder="username/Email"/>
                                </div>
                                {formik.touched.email && formik.errors.email ? (
                                           <div> <span className="error">{formik.errors.email}</span><br></br></div>
                                                   ) : null}
                            
                                
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><FaKey/></span>
                                    </div>
                                    <input type="password" 
                                    autoComplete="off"
                                     name="password"
                                      className="form-control"
                                       placeholder="password"
                                       onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                     value={formik.values.password}  />
                                     
                                </div>
       
                                {formik.touched.password && formik.errors.password ? (
                                            <div><label className="error">{formik.errors.password}</label><br></br></div>
                                                   ) : null}
                             
                                <div className="row align-items-center remember">
                                    <input type="checkbox"/>Remember Me
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Login" className="btn float-right login_btn" />
                                </div>
                            </form>
                          
                        </div>
                       
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<a href="#">Sign Up</a>
                                
                            </div>
                        </div>
                    </div>
                </div>
           
            </div>
   
    </>

    )
}
export default Login;