import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import axios from 'axios'
import "./App.css";

function App() {
  const [state, setState] = useState({
    response: false,
    endpoint: "http://127.0.0.1:4001/",
  });

  useEffect(() => {
    const { endpoint } = state;
    const socket = socketIOClient(endpoint);

    axios
      .get("http://127.0.0.1:4001/api")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });

    socket.on("FromAPI", (data) => setState({ ...state, response: data }));
  }, []);

  console.log("state ****", state);
  const { response } = state;

  return (
    <div style={{ textAlign: "center" }}>
      {response ? (
        <div>
          <h1>{response.albumId}</h1>
          <br />
          <h1>{response.id}</h1>
          <br />
          <h2>{response.title}</h2>
          <br />
          <img src={response.thumbnailUrl} width="300px" height="300px" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
