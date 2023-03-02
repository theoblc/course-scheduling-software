import React, { Component } from "react";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Cours from "./components/cours";
import Module from "./components/module";
import Salle from "./components/salle";
import Seance from "./components/seance";
import Enseignant from "./components/enseignant";

import ListeCours from "./ListeComponents/ListeCours";
import ListeModule from "./ListeComponents/ListeModule";
import ListeSalle from "./ListeComponents/ListeSalle";
import ListeSeance from "./ListeComponents/ListeSeance";
import ListeEnseignant from "./ListeComponents/ListeEnseignant";

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
