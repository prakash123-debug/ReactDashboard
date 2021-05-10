import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import axiosInstance from "../../Helpers/Axios";
import { BsListUl } from "react-icons/bs";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
// import { TagsData } from './TagsData';
// const animatedComponents = makeAnimated();
const Validate = Yup.object().shape({
  categoryId: Yup.string().required("Required"),
  subCategoryId: Yup.string().required("Required"),
  placeName: Yup.string().max(70, "Too Long!").required("Required"),
  description: Yup.string()
    .min(5, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  longitude: Yup.string().required("Required"),
  latitude: Yup.string().required("Required"),
  phoneNumber: Yup.number()
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8, "Too Sort!")
    .required("Required"),
  email: Yup.string().email("must be in email format").required("Required"),
});
const PlacesModal = ({ shows, close }) => {
  // const [notification, notificationError] = useState(false);
  const [btnDisable, SetbtnDisabled] = useState(false);
  const [access_token, setAccessToken] = useState("");
  const [notification, notificationError] = useState("");
  const [categoryItems, SetCategoryItems] = useState([]);
  const [SubCategoryItems, SetSubCategoryItems] = useState([]);
  const [TagItems, SetTagItems] = useState([]);
  const [catId, SetCatId] = useState("");
  // const [optionsData,SetTagData]=useState([
  //   {value:"abc",label:"def"}
  // ])

  useEffect(() => {
    if (localStorage.token) {
      setAccessToken(localStorage.token);
    }
    if (btnDisable) {
      const timer = setTimeout(() => {
        SetbtnDisabled(false);
      }, 5000);
    }
    if (notification) {
      const timers = setTimeout(() => {
        notificationError(false);
      }, 4000);
    }
    fetchingCategory();
    fetchingSubCategory();
    fetchingTags();
  }, [shows]);

  const fetchingCategory = useCallback(async () => {
    axiosInstance
      .get("/dashboard/category", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${access_token}`,
        },
      })
      .then((res) => {
        SetCategoryItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const fetchingSubCategory = useCallback(async () => {
    axiosInstance
      .get("/dashboard/subcategory", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${access_token}`,
        },
      })
      .then((res) => {
        SetSubCategoryItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const fetchingTags = useCallback(async () => {
    axiosInstance
      .get("/dashboard/tag", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${access_token}`,
        },
      })
      .then((res) => {
        SetTagItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const selectChange = (e) => {
    SetCatId(e.target.value);
  };
  return (
    <>
      <Formik
        initialValues={{
          categoryId: "",
          subCategoryId: "",
          placePhotos: [],
          placeVideos: [],
          tagId: [],
          description: "",
        }}
        validationSchema={Validate}
        onSubmit={async (values, actions) => {
          let formdata = new FormData();
          formdata.append("categoryId", values.categoryId);
          formdata.append("email", values.email);
          formdata.append("phoneNumber", values.phoneNumber);
          formdata.append("subCategoryId", values.subCategoryId);
          formdata.append("description", values.description);
          formdata.append("latitude", values.latitude);
          formdata.append("longitude", values.longitude);
          formdata.append("placeName", values.placeName);
          formdata.append("tags", JSON.stringify(values.tagId));

          const roomPictures = values.placePhotos;
          Array.from(roomPictures).forEach((file) => {
            formdata.append("placePhotos", file);
          });

          const roomVideo = values.placeVideos;
          Array.from(roomVideo).forEach((file) => {
            formdata.append("placeVideos", file);
          });

          await axiosInstance
            .post("/dashboard/place", formdata, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `token ${access_token}`,
              },
            })
            .then((res) => {
              console.log(res);
              SetbtnDisabled(true);
              notificationError(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Modal
            show={shows}
            size="lg"
            onHide={close}
            backdrop="static"
            keyboard={false}
          >
            {notification ? (
              <div className="alert w-40 alert-success alert-dismissible">
                <strong>success!</strong> Data Updated Sucessfully
                <button
                  type="button"
                  onClick={() => {
                    notificationError(false);
                  }}
                  className="close"
                  data-dismiss="alert"
                >
                  &times;
                </button>
              </div>
            ) : null}
            <form onSubmit={props.handleSubmit} encType="multipart/form-data">
              <Modal.Header>
                <Modal.Title>Places</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="block-content col-md-6">
                    <div className="form-group">
                      <label htmlhtmlFor="w-10">Select Category </label>
                      <sup className="text-danger">*</sup>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <BsListUl />
                          </span>
                        </div>
                        <select
                          className="form-control"
                          name="categoryId"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.categoryId}
                          autoComplete="off"
                          onClick={selectChange}
                        >
                          <option>Select Category</option>
                          {categoryItems.map((index, i) => {
                            return (
                              <option key={i} value={index.id}>
                                {index.categoryName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <span className="error">
                      <ErrorMessage name="categoryId" />
                    </span>
                  </div>

                  <div className="block-content col-md-6">
                    <div className="form-group">
                      <label htmlFor="w-10">Select SubCategory </label>
                      <sup className="text-danger">*</sup>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <BsListUl />
                          </span>
                        </div>
                        <select
                          className="form-control"
                          name="subCategoryId"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.subCategoryId}
                          autoComplete="off"
                        >
                          <option>Select SubCategory</option>
                          {SubCategoryItems.map((index, i) => {
                            if (index.categoryId == catId) {
                              return (
                                <option key={i} value={index.id}>
                                  {index.subCategoryName}
                                </option>
                              );
                            } else {
                              return (
                                <option key={i} disabled>
                                  No Data Found!!
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                    </div>
                    <span className="error">
                      <ErrorMessage name="subCategoryId" />
                    </span>
                  </div>
                  <div className="block-content col-md-6">
                    <div className="form-group">
                      <label htmlFor="w-10">Place Name</label>
                      <sup className="text-danger">*</sup>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <BsListUl />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="placeName"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.placeName}
                          autoComplete="off"
                          placeholder="Please enter Place name"
                        />
                      </div>
                    </div>
                    <span className="error">
                      <ErrorMessage name="placeName" />
                    </span>
                  </div>
                  <div className="block-content col-md-6">
                    <div className="form-group">
                      <label htmlFor="w-10">Phone Number</label>
                      <sup className="text-danger">*</sup>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <BsListUl />
                          </span>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          name="phoneNumber"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.phoneNumber}
                          autoComplete="off"
                          placeholder="Please enter Phone Number"
                        />
                      </div>
                    </div>
                    <span className="error">
                      <ErrorMessage name="phoneNumber" />
                    </span>
                  </div>
                  <div className="block-content col-md-6">
                    <div className="form-group">
                      <label htmlFor="w-10">Email</label>
                      <sup className="text-danger">*</sup>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <BsListUl />
                          </span>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.email}
                          autoComplete="off"
                          placeholder="Please enter email"
                        />
                      </div>
                    </div>
                    <span className="error">
                      <ErrorMessage name="email" />
                    </span>
                  </div>

                  <div className="block-content col-md-6">
                    <div className="form-group">
                      <label htmlFor="w-10">Latitude</label>
                      <sup className="text-danger">*</sup>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <BsListUl />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="latitude"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.latitude}
                          autoComplete="off"
                          placeholder="Please enter latitude"
                        />
                      </div>
                    </div>
                    <span className="error">
                      <ErrorMessage name="latitude" />
                    </span>
                  </div>
                  <div className="block-content col-md-6">
                    <div className="form-group">
                      <label htmlFor="w-10">Longitude</label>
                      <sup className="text-danger">*</sup>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <BsListUl />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="longitude"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.longitude}
                          autoComplete="off"
                          placeholder="Please enter longitude"
                        />
                      </div>
                    </div>
                    <span className="error">
                      <ErrorMessage name="longitude" />
                    </span>
                  </div>
                  <div className="block-content col-md-6">
                    <div className="form-group">
                      <label htmlFor="w-10">Select Tags </label>
                      <sup className="text-danger">*</sup>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <BsListUl />
                          </span>
                        </div>
                        {/* <div style={{width:'89%'}}>
                      <Select 
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                      
                          isMulti
                          options={optionsData}
    
                         />
                         </div> */}
                        <select
                          className="form-control"
                          name="tagId"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          autoComplete="off"
                          multiple
                        >
                          <option>Select Tag</option>
                          {TagItems.map((index, i) => {
                            return (
                              <option key={i} value={index.id}>
                                {index.tagName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <span className="error">
                      <ErrorMessage name="tagId" />
                    </span>
                  </div>

                  <div className="block-content col-md-6">
                    <div className="form-group">
                      <label htmlFor="w-10">Select placePhotos</label>
                      <sup className="text-danger">*</sup>
                      <div className="input-group">
                        <input
                          type="file"
                          name="placePhotos"
                          onChange={(event) =>
                            props.setFieldValue(
                              "placePhotos",
                              event.target.files
                            )
                          }
                          onBlur={props.handleBlur}
                          multiple
                          autoComplete="off"
                          placeholder="Please enter category name"
                        />
                      </div>
                    </div>
                    <span className="error">
                      <ErrorMessage name="placePhotos" />
                    </span>
                  </div>

                  <div className="block-content col-md-6">
                    <div className="form-group">
                      <label htmlFor="w-10">Select placeVideos</label>
                      <sup className="text-danger">*</sup>
                      <div className="input-group">
                        <input
                          type="file"
                          name="placeVideos"
                          onChange={(event) =>
                            props.setFieldValue(
                              "placeVideos",
                              event.target.files
                            )
                          }
                          onBlur={props.handleBlur}
                          multiple
                          autoComplete="off"
                          placeholder="Please enter category name"
                        />
                      </div>
                    </div>
                    <span className="error">
                      <ErrorMessage name="placeVideos" />
                    </span>
                  </div>

                  <div className="form-group col-md-12">
                    <label htmlFor="wizard-validation-classic-bio">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      name="description"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.description}
                      autoComplete="off"
                      rows="5"
                    ></textarea>
                  </div>
                  <span className="error">
                    <ErrorMessage name="description" />
                  </span>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                  Close
                </Button>
                <Button type="submit" disabled={btnDisable} variant="primary">
                  Submit
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        )}
      </Formik>
    </>
  );
};

export default PlacesModal;
