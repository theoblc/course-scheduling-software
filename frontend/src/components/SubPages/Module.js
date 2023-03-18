import React from "react";
import { useParams } from "react-router-dom";
import withRouter from "../Assets/WithRouter";
import FicheProgramme from "./FicheProgramme";
import Cours from "./Cours";

function Module() {
  const { id } = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <FicheProgramme idModule={id} />
        </div>
        <div className="col-7">
          <Cours idModule={id} />
        </div>
      </div>
    </div>
  );
}

export default withRouter(Module);
