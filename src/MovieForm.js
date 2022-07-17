import React from "react";
import { useRef, useState } from "react";
import shortid from "shortid";
import { useNavigate } from "react-router-dom";

const MovieForm = ({ setMovieData }) => {
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

  let title1 = useRef();
  let poster1 = useRef();
  let rating1 = useRef();
  let summary1 = useRef();
  let trailer1 = useRef();

  let closeHandler = (e) => {
    e.preventDefault();
    navigate("/movie");
  };
  let submitHandler = (e) => {
    e.preventDefault();
    let id = shortid.generate().toString();
    console.log("id in submit =", id);

    if (
      title1.current.value.trim().length !== 0 &&
      poster1.current.value.trim().length !== 0 &&
      rating1.current.value.trim().length !== 0 &&
      summary1.current.value.trim().length !== 0
    ) {
      let obj = {
        id: id,
        movieID: id,
        name: title1.current.value,
        poster: poster1.current.value,
        rating: rating1.current.value,
        summary: summary1.current.value,
        trailer: trailer1.current.value,
      };

      try {
        let data1 = postingData(obj);
      } catch (err) {
        console.log(err);
      }

      // setShowForm(false);
    } else {
      alert("Please enter All the required Fields");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="text-center bg-dark text-white p-3"
      style={{ width: "50%", margin: "20px auto" }}
    >
      <div className="my-3">
        <label htmlFor="title" style={{ display: "block" }}>
          Title:
        </label>
        <input type="text" ref={title1} />
      </div>
      <div className="my-3">
        <label htmlFor="poster" style={{ display: "block" }}>
          Poster URL:
        </label>
        <input type="text" ref={poster1} />
      </div>
      <div className="my-3">
        <label htmlFor="trailer" style={{ display: "block" }}>
          Trailer URL:
        </label>
        <input type="text" ref={trailer1} />
      </div>
      <div className="my-3">
        <label htmlFor="rating" style={{ display: "block" }}>
          Rating:
        </label>
        <input type="text" ref={rating1} />
      </div>
      <div className="my-3">
        <label htmlFor="title" style={{ display: "block" }}>
          Summary:
        </label>
        <textarea name="" id="" cols="30" rows="3" ref={summary1}></textarea>
      </div>
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

export default MovieForm;
