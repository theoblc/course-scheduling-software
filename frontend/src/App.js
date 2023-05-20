import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Modules from "./components/Pages/Modules";
import PlanificationEPH from "./components/Pages/PlanificationEPH";
import Enseignants from "./components/Pages/Enseignants";
import Salles from "./components/Pages/Salles";
import PlanificationModule from "./components/SubPages/PlanificationModule";
import FicheProgramme from "./components/SubPages/FicheProgramme";
import PageNotFound from "./components/Pages/PageNotFound";
import Navbar from "./components/Assets/NavBar";

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
              path="/modules/:id/PlanificationModule"
              element={<PlanificationModule />}
            />
            <Route path="/modules" element={<Modules />} />
            <Route path="/salles" element={<Salles />} />
            <Route path="/seances" element={<PlanificationEPH />} />
            <Route path="/enseignants" element={<Enseignants />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
