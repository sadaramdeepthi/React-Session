import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import InputFields from "./components/InputFields/InputFields";

function App() {
  return (
    <div className="app-container">
      <h1 className="h1-wrapper">Movies List</h1>
      <InputFields />
    </div>
  );
}

export default App;
