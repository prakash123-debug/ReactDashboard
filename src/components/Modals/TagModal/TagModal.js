
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import axiosInstance from '../../Helpers/Axios'
import { BsListUl } from "react-icons/bs";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";

const Validate = Yup.object().shape({

  tag_name: Yup.string()
    .required('Required'),
});
const TagModal = ({ shows, close }) => {
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
        initialValues={{ tag_name: "" }}
        validationSchema={Validate}

        onSubmit={async (values, actions) => {
          const data = {
            tagName: values.tag_name,
          }

          await axiosInstance.post('/dashboard/tag', data, {
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
              tag_name: ''
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
                <Modal.Title>Tags</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="block-content">
                  <div className="form-group">
                    <label for="w-10">Tag Name</label><sup className="text-danger">*</sup>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <BsListUl />
                        </span>
                      </div>
                      <input type="text"
                        className="form-control"
                        name="tag_name"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.tag_name}
                        autoComplete="off"
                        placeholder="Please enter tag name" />
                    </div>
                  </div>
                </div>
                <span className="error"><ErrorMessage name="tag_name" /></span>
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

export default TagModal


