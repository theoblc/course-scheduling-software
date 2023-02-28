import React, { Component } from "react";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Cours from "./components/Cours";
import Module from "./components/Module";
import Salle from "./components/Salle";
import Seance from "./components/Seance";
import Enseignant from "./components/Enseignant";

import ListeCours from "./components/ListeCours";
import ListeModule from "./components/ListeModule";
import ListeSalle from "./components/ListeSalle";
import ListeSeance from "./components/ListeSeance";
import ListeEnseignant from "./components/ListeEnseignant";

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
            <Route path="/salles/:id" element={<Salle />} />
            <Route path="/salles" element={<ListeSalle />} />
            <Route path="/seances/:id" element={<Seance />} />
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
