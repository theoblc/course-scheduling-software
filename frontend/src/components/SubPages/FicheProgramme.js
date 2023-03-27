import React from "react";
import { useParams } from "react-router-dom";
import withRouter from "../Assets/WithRouter";
import Delete from "../Assets/Delete";
import Module from "./Module";
import Cours from "./Cours";

function FicheProgramme() {
  const { id } = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <Module idModule={id} />
        </div>
        <div className="col-9">
          <Cours idModule={id} />
        </div>
        <div className="col-12">
          <hr className="mt-4 mb-0" />
          <div className="d-flex justify-content-end align-items-center pb-3">
            <div className="border-right pr-3"></div>
            <div className="align-items-center">
              <Delete
                baseURL="http://localhost:8000/api/modules/"
                id={id}
                redirection="/modules"
                message="Supprimer le module"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(FicheProgramme);
