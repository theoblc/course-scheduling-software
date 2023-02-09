import React, { Component } from "react";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Cours from "./components/cours";
import Module from "./components/module";
import Salle from "./components/salle";
import Seance from "./components/seance";
import Enseignant from "./components/enseignant";

import Cours from "./Entity/Cours";
import Enseignant from "./Entity/Enseignant";
import Module from "./Entity/Module";
import Salle from "./Entity/Salle";
import Seance from "./Entity/Seance";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/Cours" element={<Cours />} />
            <Route path="/Module" element={<Module />} />
            <Route path="/Salle" element={<Salle />} />
            <Route path="/Seance" element={<Seance />} />
            <Route path="/Enseignant" element={<Enseignant />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
