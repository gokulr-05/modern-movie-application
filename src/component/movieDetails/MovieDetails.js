import React from "react";
import "./movieDetails.css";
import { Link, useParams } from "react-router-dom";

const MovieDetails = ({ reactionArr, movieData }) => {
  let { id } = useParams();
  let arr = movieData.filter((value, index, array) => {
    console.log("value=", value, "id=", id);

    return value?.movieID === id || value?.id === id;
  });
  console.log("id in movie details=", id);
  console.log("arr=", arr);

  let ratings = arr[0]?.rating;
  let ratingsColor = ratings > 8 ? "text-success" : "text-danger";
  return (
    <div>
      <div
        style={{ width: "70vw", height: "70vh", margin: "20px auto" }}
        className="MovieDetails-area pb-5"
      >
        <iframe
          className=" movieDetails-trailer w-100 h-100"
          title={arr[0]?.name}
          src={arr[0]?.trailer}
          frameBorder="0"
        ></iframe>

        <div className="d-flex align-items-center justify-content-between px-2">
          <h1>{arr[0]?.name}</h1>

          <strong className={`fs-3 ${ratingsColor} `}>
            ⭐{arr[0]?.rating}
          </strong>
        </div>
        <p>{arr[0]?.summary}</p>
        <div
          style={{ margin: "20px" }}
          className="text-center d-flex align-items-center justify-content-center gap-5"
        >
          <div className="d-flex align-items-center justify-content-center gap-3">
            <p className="m-0">👍</p>
            <strong className="m-0 text-success">
              {reactionArr[0]?.count}
            </strong>
          </div>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <p className="m-0">👎</p>
            <strong className="m-0 text-danger">{reactionArr[1]?.count}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
