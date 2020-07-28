import React, { useEffect, useContext } from "react";
import Page from "./Page";
import StateContext from "../StateContext";
import { useImmer } from "use-immer";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Axios from "axios";
import { Link } from "react-router-dom";
import Post from "./Post";

function Home() {
  const appState = useContext(StateContext);
  const [state, setState] = useImmer({
    isLoading: true,
    feed: [],
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchData() {
      try {
        const response = await Axios.post(
          "/getHomeFeed",
          {
            token: appState.user.token,
          },
          {
            cancelToken: ourRequest.token,
          }
        );
        setState((draft) => {
          draft.isLoading = false;
          draft.feed = response.data;
        });
      } catch (e) {
        console.log("Houve um probelma");
      }
    }
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  if (state.isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <Page title="Seu Feed">
      {state.feed.length == 0 && (
        <>
          <h2 className="text-center">
            Olá <strong>{appState.user.username}</strong>, seu feed está vazio.
          </h2>
          <p className="lead text-muted text-center">
            Seu feed mostra as últimas postagens feitas pelas pessoas que você
            segue. Se você não segue ninguém, tudo bem! Você pode usar a busca
            no menu para achar conteúdo feito por pessoas com gostos similares
            ao seu, para então segui-las.
          </p>
        </>
      )}

      {state.feed.length > 0 && (
        <>
          <h2 className="text-center mb-4"> Últimas postagens </h2>
          <div className="list-group">
            {state.feed.map((post) => {
              return <Post post={post} key={post._id} />;
            })}
          </div>
        </>
      )}
    </Page>
  );
}

export default Home;
