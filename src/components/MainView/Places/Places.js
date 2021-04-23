import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../BreadCrumb/Breadcrumb';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { BsFillPlusCircleFill, BsPersonFill } from "react-icons/bs";
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};

    if (!values.category_name) {
        errors.category_name = 'Category field is required';
    }

    if (!values.subcategory_name) {
        errors.subcategory_name = 'SubCategory field is required';
    }
    return errors;
};
const Places = () => {
    // console.log(colorPalette);

    const formik = useFormik({
        initialValues: {
            category_name: '',
            subcategory_name: '',
            longitude:'',
            latitude:'',
            picture:'',
            video:''
        },
        validate,

        onSubmit: values => {
            const data = {
                category_name: values.category_name,
            }

        },
    });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [crumbs, setCrumbs] = useState(['Home', 'Places']);
    const selected = crumb => {
        console.log(crumb);
    }
    return (
        <>
            <Row className="BreadcrumbStyle" >
                <Col md="12"  >
                    <Col md="10" className="float-left">
                        <Breadcrumb crumbs={crumbs} selected={selected}>
                        </Breadcrumb>
                    </Col>
                    <Col md="2" className="float-right">
                        <Button className="float-right ProductButton" onClick={handleShow}><BsFillPlusCircleFill /></Button>
                    </Col>
                </Col>
            </Row>
            <Row className="BreadcrumbStyle mt-4">

                <Table striped bordered hover className="table-striped table-responsive w-100 d-block d-md-table">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Category</th>
                            <th>Sub Category name</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>category 1</td>
                            <td>subcategory 1</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>category 2</td>
                            <td>subcategory 2</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Category 3</td>
                            <td>subCategory 3</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>




            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="block-content">
                            <div className="form-group">
                                <label>Category</label><sup className="text-danger">*</sup>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <BsPersonFill />
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        name="category_name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.category_name}
                                        autoComplete="off"

                                    >
                                        <option selected="true" disabled="true">Select Category</option>
                                        <option>Allowances</option>                                                                                                                                                                           &gt;
                                                        <option>Expenses</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {formik.touched.category_name && formik.errors.category_name ? (
                            <div> <span className="error">{formik.errors.category_name}</span><br></br></div>) : null}
                        <div className="block-content">
                            <div className="form-group">
                                <label>SubCategory</label><sup className="text-danger">*</sup>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <BsPersonFill />
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        name="subcategory_name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.subcategory_name}
                                        autoComplete="off"

                                    >
                                        <option selected="true" disabled="true">Select SubCategory</option>
                                        <option>Allowances</option>                                                                                                                                                                           &gt;
                                                        <option>Expenses</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {formik.touched.subcategory_name && formik.errors.subcategory_name ? (
                            <div> <span className="error">{formik.errors.subcategory_name}</span><br></br></div>) : null}

                        <div className="block-content">
                            <div className="form-group">
                                <label for="w-10">Latitude</label><sup className="text-danger">*</sup>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <BsPersonFill />
                                        </span>
                                    </div>
                                    <input type="text"
                                        className="form-control"
                                        name="latitude"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.latitude}
                                        autoComplete="off"
                                        placeholder="Please enter subcategory  name" />
                                </div>
                            </div>
                        </div>
                        {formik.touched.latitude && formik.errors.latitude ? (
                            <div> <span className="error">{formik.errors.latitude}</span><br></br></div>
                        ) : null}
                        <div className="block-content">
                            <div className="form-group">
                                <label for="w-10">Longitude</label><sup className="text-danger">*</sup>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <BsPersonFill />
                                        </span>
                                    </div>
                                    <input type="text"
                                        className="form-control"
                                        name="longitude"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.longitude}
                                        autoComplete="off"
                                        placeholder="Please enter subcategory  name" />
                                </div>
                            </div>
                        </div>
                        {formik.touched.longitude && formik.errors.longitude ? (
                            <div> <span className="error">{formik.errors.longitude}</span><br></br></div>
                        ) : null}

                       <div className="block-content">
                            <div class="form-group ">
                                <label for="wizard-validation-classic-picture">Picture</label><sup class="text-danger">*</sup>
                                <div className="custom-file">
                                <input type="file"
                                  className="form-control"
                                  name="picture"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.picture}
                                  autoComplete="off"
                                  placeholder="Please enter subcategory  name" />

                                    <label className="custom-file-label" for="wizard-validation-classic-attachment">Choose Picture</label>
                                </div>
                            </div>
                        </div>
                        {formik.touched.picture && formik.errors.picture ? (
                            <div> <span className="error">{formik.errors.picture}</span><br></br></div>
                        ) : null}

                            <div className="block-content">
                            <div class="form-group ">
                                <label for="wizard-validation-classic-picture">Video</label><sup class="text-danger">*</sup>
                                <div className="custom-file">
                                <input type="file"
                                  className="form-control"
                                  name="video"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.video}
                                  autoComplete="off"
                                  placeholder="Please enter subcategory  name" />

                                    <label className="custom-file-label" for="wizard-validation-classic-attachment">Choose video</label>
                                </div>
                            </div>
                        </div>
                        {formik.touched.video && formik.errors.video ? (
                            <div> <span className="error">{formik.errors.video}</span><br></br></div>
                        ) : null}

                 

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button type="submit" variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>



        </>
    )
}
export default Places;