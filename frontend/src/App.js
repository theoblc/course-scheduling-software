import React, { Component } from "react";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Cours from "./components/cours";
import ListeModule from "./components/ListeModule";
import Salle from "./components/salle";
import Seance from "./components/seance";
import Enseignant from "./components/enseignant";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Cours />} />
            <Route path="/Cours" element={<Cours />} />
            <Route path="/Modules" element={<ListeModule />} />
            <Route path="/Salle" element={<Salle />} />
            <Route path="/Seance" element={<Seance />} />
            <Route path="/Enseignant" element={<Enseignant />} />
            {/**
            <Route path="*" element={<Cours />} />
            **/}
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
