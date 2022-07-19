import React from "react";
import Item from "./Item";
import MovieForm from "./MovieForm";
import { useState, useEffect } from "react";
import Welcome from "./Welcome";
import NotFound from "./component/notFound/NotFound";
import { Routes, Route, Link } from "react-router-dom";
import MovieDetails from "./component/movieDetails/MovieDetails";
import Header1 from "./component/header1/Header1";
import EditMovie from "./component/editMovie/EditMovie";
import MovieFormCopy from "./MovieFormCopy";

const App = () => {
  let [editObj, setEditObj] = useState({});
  let [showForm, setShowForm] = useState(false);
  let [reactionArr, setReactionArr] = useState([]);

  let editObjHandler = (obj) => {
    setEditObj(obj);
  };

  let reactionArrHandler = (array1) => {
    setReactionArr(array1);
  };

  let [movieData, setMovieData] = useState([]);
  let getData = async () => {
    let response = await fetch(
      "https://627f71ccbe1ccb0a465fd36c.mockapi.io/movieAPI"
    );
    let data = await response.json();
    console.log("fetched data=", data);
    setMovieData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header1 />
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/:id/movieDetails"
            element={
              <MovieDetails movieData={movieData} reactionArr={reactionArr} />
            }
          />

          <Route
            path="/addMovie"
            element={<MovieFormCopy setMovieData={setMovieData} />}
          />

          <Route
            path="/editMovie"
            element={
              <EditMovie
                getData={getData}
                editObj={editObj}
                movieData={movieData}
              />
            }
          />

          <Route
            path="/movie"
            element={
              <div>
                <div className="p-5">
                  <div className="text-center"></div>

                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ marginBottom: "50px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        width: "30%",
                        margin: "50px auto",
                        color: "white",
                      }}
                    >
                      {movieData.map((val, index) => {
                        return (
                          <Item
                            reactionArrHandler={reactionArrHandler}
                            key={index}
                            id={val.id}
                            movieID={val.movieID}
                            ratings={val.rating}
                            summary={val.summary}
                            img={val.poster}
                            trailer={val.trailer}
                            title={val.name}
                            getData={getData}
                            editObjHandler={editObjHandler}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
