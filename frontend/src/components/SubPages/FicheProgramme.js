import React from "react";
import { useParams } from "react-router-dom";
import withRouter from "../Assets/WithRouter";
import Module from "./Module";
import Cours from "./Cours";

function FicheProgramme() {
  const { id } = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <Module idModule={id} />
        </div>
        <div className="col-7">
          <Cours idModule={id} />
        </div>
      </div>
    </div>
  );
}

export default withRouter(FicheProgramme);
