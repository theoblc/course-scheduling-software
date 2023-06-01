// Bibliothèques
import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

// Composants
import Modules from "./composants/PagesPrincipales/Modules";
import PlanificationEPH from "./composants/PagesPrincipales/PlanificationEPH";
import Enseignants from "./composants/PagesPrincipales/Enseignants";
import Salles from "./composants/PagesPrincipales/Salles";
import PlanificationModule from "./composants/PagesSecondaires/PlanificationModule";
import FicheProgramme from "./composants/PagesSecondaires/FicheProgramme";
import PageIntrouvable from "./composants/PagesPrincipales/PageIntrouvable";
import BarreNavigation from "./composants/ElementsInterface/BarreNavigation";

// Code
class App extends Component {
  render() {
    return (
      <>
        <BarreNavigation />
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
            <Route path="*" element={<PageIntrouvable />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
