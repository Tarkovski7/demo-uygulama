import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

axios.defaults.baseURL = "http://localhost:5000";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <div>
      <App />
    </div>
  </Router>
);
