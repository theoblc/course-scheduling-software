import React, { Component } from "react";
import Navbar from "./components/Assets/NavBar";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Cours from "./components/Entities/Cours";
import Module from "./components/Entities/Module";
import Enseignant from "./components/Entities/Enseignant";

import ListeCours from "./components/ListeComponents/ListeCours";
import ListeModule from "./components/ListeComponents/ListeModule";
import ListeSalle from "./components/ListeComponents/ListeSalle";
import ListeSeance from "./components/ListeComponents/ListeSeance";
import ListeEnseignant from "./components/ListeComponents/ListeEnseignant";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<ListeModule />} />
            <Route path="/cours/:id" element={<Cours />} />
            <Route path="/cours" element={<ListeCours />} />
            <Route path="/modules/:id" element={<Module />} />
            <Route path="/modules" element={<ListeModule />} />
            <Route path="/salles" element={<ListeSalle />} />
            <Route path="/seances" element={<ListeSeance />} />
            <Route path="/enseignants/:id" element={<Enseignant />} />
            <Route path="/enseignants" element={<ListeEnseignant />} />
            <Route path="*" element={<ListeModule />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
