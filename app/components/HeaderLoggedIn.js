import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import ReactTooltip from "react-tooltip";

function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleLogout() {
    appDispatch({ type: "logout" });
    appDispatch({
      type: "flashMessage",
      value: "Saída efetuada com sucesso",
    });
  }
  function handleSearchIcon(e) {
    e.preventDefault();
    appDispatch({ type: "openSearch" });
  }
  return (
    <div className="flex-row my-3 my-md-0">
      <a
        data-for="search"
        data-tip="Procurar"
        onClick={handleSearchIcon}
        href="#"
        className="text-white mr-2 header-search-icon"
      >
        <i className="fas fa-search"></i>
      </a>{" "}
      <ReactTooltip place="bottom" id="search" className="custom-tooltip" />
      <span
        onClick={() => appDispatch({ type: "toggleChat" })}
        data-for="chat"
        data-tip="Chat"
        className={
          "mr-2 header-chat-icon " +
          (appState.unreadChatCount ? "text-danger" : "text-white")
        }
      >
        <i className="fas fa-comment"></i>
        {appState.unreadChatCount ? (
          <span className="chat-count-badge text-white">
            {" "}
            {appState.unreadChatCount < 10
              ? appState.unreadChatCount
              : "9+"}{" "}
          </span>
        ) : (
          ""
        )}
      </span>{" "}
      <ReactTooltip place="bottom" id="chat" className="custom-tooltip" />
      <Link
        data-for="profile"
        data-tip="Meu Perfil"
        to={`/profile/${appState.user.username}`}
        className="mr-2"
      >
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>{" "}
      <ReactTooltip place="bottom" id="profile" className="custom-tooltip" />
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Criar Post
      </Link>
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sair
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
