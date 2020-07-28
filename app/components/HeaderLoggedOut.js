import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import DispatchContext from "../DispatchContext";

function HeaderLoggedOut(props) {
  const appDispatch = useContext(DispatchContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/login", {
        username,
        password,
      });
      if (response.data) {
        appDispatch({ type: "login", data: response.data });
        appDispatch({
          type: "flashMessage",
          value: "Login efetuado com sucesso",
        });
      } else {
        console.log("usuario/senha incorretos");
        appDispatch({
          type: "flashMessage",
          value: "Usuário/Senha inválido",
        });
      }
    } catch (e) {
      console.log("Houve um problema");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            className="form-control form-control-sm"
            type="text"
            placeholder="Usuário"
            autoComplete="off"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className="form-control form-control-sm"
            type="password"
            placeholder="Senha"
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Entrar</button>
        </div>
      </div>
    </form>
  );
}

export default HeaderLoggedOut;
