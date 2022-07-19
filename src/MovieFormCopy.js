import React from "react";
import { useRef, useState } from "react";
import shortid from "shortid";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

let validationObject = yup.object({
  name: yup.string().required("if name is lost your identity is lost😂").trim(),
  poster: yup.string().required("poster may catch many eyes😍").trim(),
  rating: yup.string().required("rating is the deciding authority👑").trim(),
  summary: yup
    .string()
    .required("Adding summary will not take much time😉")
    .trim(),
  trailer: yup.string().required("trailer is a visual treat for fans🤩").trim(),
});
const MovieFormCopy = ({ setMovieData }) => {
  let navigate = useNavigate();
  // posting method
  let postingData = async (obj) => {
    let response = await fetch(
      "https://627f71ccbe1ccb0a465fd36c.mockapi.io/movieAPI",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      }
    );
    let data = await response.json();
    setMovieData((p) => {
      return [data, ...p];
    });
    console.log("post data=", data);
    navigate("/movie");
    return data;
  };

  let formik = useFormik({
    initialValues: {
      name: "",
      poster: "",
      rating: "",
      summary: "",
      trailer: "",
    },
    validationSchema: validationObject,
    onSubmit: (obj) => {
      let id = shortid.generate().toString();
      let obj1 = { id: id, movieID: id, ...obj };
      console.log("on submit:", obj1);
      try {
        postingData(obj1);
      } catch (err) {
        console.log(err);
      }
    },
  });

  let title1 = useRef();
  let poster1 = useRef();
  let rating1 = useRef();
  let summary1 = useRef();
  let trailer1 = useRef();

  let closeHandler = (e) => {
    e.preventDefault();
    navigate("/movie");
  };
  // let submitHandler = (e) => {
  //   e.preventDefault();
  //   let id = shortid.generate().toString();
  //   console.log("id in submit =", id);

  //   if (
  //     title1.current.value.trim().length !== 0 &&
  //     poster1.current.value.trim().length !== 0 &&
  //     rating1.current.value.trim().length !== 0 &&
  //     summary1.current.value.trim().length !== 0
  //   ) {
  //     let obj = {
  //       id: id,
  //       movieID: id,
  //       name: title1.current.value,
  //       poster: poster1.current.value,
  //       rating: rating1.current.value,
  //       summary: summary1.current.value,
  //       trailer: trailer1.current.value,
  //     };

  //     try {
  //       postingData(obj);
  //     } catch (err) {
  //       console.log(err);
  //     }

  //     // setShowForm(false);
  //   } else {
  //     alert("Please enter All the required Fields");
  //   }
  // };

  return (
    <form
      onSubmit={formik.handleSubmit}
      // onSubmit={submitHandler}
      className="text-center bg-dark text-white p-3"
      style={{ width: "50%", margin: "20px auto" }}
    >
      <div className="my-3">
        <label htmlFor="name" style={{ display: "block" }}>
          Title:
        </label>
        <input
          onBlur={formik.handleBlur}
          id="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          type="text"
          // ref={title1}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-danger">{formik.errors.name}</p>
        )}
      </div>
      <div className="my-3">
        <label htmlFor="poster" style={{ display: "block" }}>
          Poster URL:
        </label>
        <input
          onBlur={formik.handleBlur}
          name="poster"
          onChange={formik.handleChange}
          value={formik.values.poster}
          type="text"
          // ref={poster1}
        />
        {formik.touched.poster && formik.errors.poster && (
          <p className="text-danger">{formik.errors.poster}</p>
        )}
      </div>
      <div className="my-3">
        <label htmlFor="trailer" style={{ display: "block" }}>
          Trailer URL:
        </label>
        <input
          onBlur={formik.handleBlur}
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
          type="text"
          // ref={trailer1}
        />
        {formik.touched.trailer && formik.errors.trailer && (
          <p className="text-danger">{formik.errors.trailer}</p>
        )}
      </div>
      <div className="my-3">
        <label htmlFor="rating" style={{ display: "block" }}>
          Rating:
        </label>
        <input
          onBlur={formik.handleBlur}
          name="rating"
          onChange={formik.handleChange}
          value={formik.values.rating}
          type="text"
          // ref={rating1}
        />
        {formik.touched.rating && formik.errors.rating && (
          <p className="text-danger">{formik.errors.rating}</p>
        )}
      </div>
      <div className="my-3">
        <label htmlFor="summary" style={{ display: "block" }}>
          Summary:
        </label>
        <textarea
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.summary}
          name="summary"
          id=""
          cols="30"
          rows="3"
          // ref={summary1}
        ></textarea>
        {formik.touched.summary && formik.errors.summary && (
          <p className="text-danger">{formik.errors.summary}</p>
        )}
      </div>
      {/* <div>value : {JSON.stringify(formik.values)}</div> */}
      {/* <div>error : {JSON.stringify(formik.errors)}</div> */}
      {/* <div>touched : {JSON.stringify(formik.touched)}</div> */}
      <div className="d-flex align-items-center justify-content-center gap-3">
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <button className="btn btn-danger" onClick={closeHandler}>
          close
        </button>
      </div>
    </form>
  );
};

export default MovieFormCopy;
