import React, { Component } from "react";
import Navbar from "./components/Assets/NavBar";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Enseignants from "./components/Pages/Enseignants";
import Modules from "./components/Pages/Modules";
import Salles from "./components/Pages/Salles";
import Seances from "./components/Pages/Seances";
import Module from "./components/SubPages/Module";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Modules />} />
            <Route path="/modules/:id" element={<Module />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/salles" element={<Salles />} />
            <Route path="/seances" element={<Seances />} />
            <Route path="/enseignants" element={<Enseignants />} />
            <Route path="*" element={<Modules />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
