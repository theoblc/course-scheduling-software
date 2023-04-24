import React, { Component } from "react";
import Navbar from "./components/Assets/NavBar";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import PageNotFound from "./components/Pages/PageNotFound";
import Enseignants from "./components/Pages/Enseignants";
import Modules from "./components/Pages/Modules";
import Salles from "./components/Pages/Salles";
import Seances from "./components/Pages/Seances";
import FicheProgramme from "./components/SubPages/FicheProgramme";
import Planification from "./components/SubPages/Planification";
import SeancesCours from "./components/SubPages/SeancesCours";
import Chevauchements from "./components/SubPages/Chevauchements";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Modules />} />
            <Route
              path="/modules/:id/FicheProgramme"
              element={<FicheProgramme />}
            />
            <Route
              path="/modules/:id/Planification"
              element={<Planification />}
            />
            <Route path="/modules" element={<Modules />} />
            <Route path="/salles" element={<Salles />} />
            <Route path="/seances" element={<Seances />} />
            <Route path="/enseignants" element={<Enseignants />} />
            <Route path="/chevauchements" element={<Chevauchements />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
