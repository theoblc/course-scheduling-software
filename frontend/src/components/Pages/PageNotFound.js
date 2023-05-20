// Bibliothèques
import React, { useEffect, useNavigate } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Code
function PageNotFound() {
  const navigate = useNavigate();
  const message =
    "La page n'a pas été trouvée, vous allez être redirigé vers la page d'accueil.";

  useEffect(() => {
    async function wait() {
      await new Promise((f) => setTimeout(f, 3000));
      navigate("/");
    }

    wait();
  }, [navigate]);

  return (
    <main className="h-100 d-flex flex-column justify-content-center align-items-center">
      <h3 className="text-center mb-4">{message}</h3>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </main>
  );
}

export default PageNotFound;
