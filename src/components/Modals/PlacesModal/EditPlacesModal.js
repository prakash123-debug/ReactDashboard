import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axiosInstance from '../../Helpers/Axios'
import { BsListUl } from "react-icons/bs";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

const Validate = Yup.object().shape({

    category_name: Yup.string()
      .required('Required'),
    sub_category_name: Yup.string()
      .required('Required'),
  });
const EditPlacesModal = ({ shows, close, ModalData }) => {
    const [AllDataItem, SetAllItem] = useState({});
    const [notification, notificationError] = useState(false);
    const [btnDisable, SetbtnDisabled] = useState(false);
    const [access_token, setAccessToken] = useState('');
    const [items,SetItems]=useState([]);


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

    useEffect(() => {
        SetAllItem(ModalData)
        fetchingSubCategory();
    },[shows]);
    const fetchingSubCategory = useCallback(async () => {
        axiosInstance.get('/dashboard/category', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
          }
        })
          .then(res => {
            SetItems(res.data)
    
          })
          .catch((error) => {
            console.log(error);
          });
      })
    

    if (AllDataItem) {
        return (
            <>

                <Formik
                    initialValues={{
                         category_name:AllDataItem.categoryId,
                        sub_category_name: AllDataItem.subCategoryName
                        }}
                    validationSchema={Validate}

                    onSubmit={async (values, actions) => {
                        const data = {
                            subCategoryName: values.sub_category_name,
                            categoryId:values.category_name
                        }

                        await axiosInstance.patch(`/dashboard/subcategory/${AllDataItem.id}`, data, {
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
                                category_name: ''
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
                            visible={true}
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
                    <label for="w-10">Select Category </label><sup className="text-danger">*</sup>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <BsListUl />
                        </span>
                      </div>
                      <select
                        className="form-control"
                        name="subcategory_name"
                        className="form-control"
                        name="category_name"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.category_name}
                        autoComplete="off"

                      >
                        {
                          items.map((index,i)=>{
                            return(
                              <option value={index.id}>{index.categoryName}</option>

                            )
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <span className="error"><ErrorMessage name="category_name" /></span>

                <div className="block-content">
                  <div className="form-group">
                    <label for="w-10">Sub Category Name </label><sup className="text-danger">*</sup>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <BsListUl />
                        </span>
                      </div>
                      <input type="text"
                        className="form-control"
                        name="sub_category_name"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.sub_category_name}
                        autoComplete="off"
                        placeholder="Please enter category name" />
                    </div>
                  </div>
                </div>
                <span className="error"><ErrorMessage name="sub_category_name" /></span>

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

    return (
        <>

        </>
    )
}

export default EditPlacesModal


