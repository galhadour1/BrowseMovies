import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./pages/Main";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movieDetails" element={<MovieDetails />} />
            <Route path="/search" element={<Main />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
