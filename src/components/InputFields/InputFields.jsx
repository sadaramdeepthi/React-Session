import React, { isValidElement, useState } from "react";
import "../../style/InputFields.scss";
import _ from "lodash";
import InlineErrors from "./InlineErrors";
import { Button, Form, Table } from "react-bootstrap";

const InputFields = () => {
  const [movieName, setmovieName] = useState("");
  const [movieRating, setmovieRating] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [errorMsg, setErrorMsg] = useState({});

  const onButtonClick = () => {
    if (!isValid()) return;
    const finalMovieList = _.concat(movieList, {
      movieName: movieName,
      movieRating: movieRating,
    });
    return setmovieList(finalMovieList);
  };
  const isValid = () => {
    const errors = {};
    if (!movieName) errors.movieName = "Movie name can't be blank";
    if (!movieRating) errors.movieRating = "Movie rating Can't be blank";

    setErrorMsg(errors);
    return !errors.movieName && !errors.movieRating;
  };

  return (
    <div className="inputfields-container">
      <Form>
        <Form.Group>
          <Form.Label>Movie Name</Form.Label>
          <Form.Control
            type="text"
            name="movieName"
            className="movieName"
            placeholder="Enter movie name"
            onChange={(e) => setmovieName(e.target.value)}
          />
          {errorMsg.movieName && <InlineErrors text={errorMsg.movieName} />}
        </Form.Group>
        <Form.Group>
          <Form.Label>Movie Rating</Form.Label>
          <Form.Control
            type="number"
            name="movieRating"
            placeholder="Enter movie rating"
            onChange={(e) => setmovieRating(e.target.value)}
            min="0"
            max="10"
            className="movieRating"
          />
          {errorMsg.movieRating && <InlineErrors text={errorMsg.movieRating} />}
          <Form.Text className="text-muted">
            Enter the rating maximum out of 10
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="button" onClick={onButtonClick} block>
          Submit
        </Button>
      </Form>
      <div className="table-container">
        {movieList.length > 0 ? (
          <Table striped bordered hover>
            <tbody>
              <tr>
                <th>S.No</th>
                <th>Movie Name</th>
                <th>Movie Rating</th>
              </tr>
              {movieList.map((movie, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}.</td>
                    <td>{movie.movieName}</td>
                    <td>{movie.movieRating}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <span className="noItemsWrapper">No Movie Records Available...</span>
        )}
      </div>
    </div>
  );
};

export default InputFields;
