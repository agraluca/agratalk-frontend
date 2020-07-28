import React from "react";
import Page from "./Page";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Page title="Não encontrado">
      <div className="text-center">
        <h2> Whoops, não encontramos essa página</h2>
        <p className="lead text-muted">
          Você pode visitar a <Link to="/">página inicial</Link> para recomeçar.
        </p>
      </div>
    </Page>
  );
}

export default NotFound;
