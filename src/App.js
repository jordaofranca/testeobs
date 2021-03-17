import React, { useContext } from "react";
import { SocketContext } from "./obsWebsocket";
import AudioBoard from "./AudioBoard";
import SceneButtons from "./SceneButtons";
import ConnectForm from "./ConnectForm";
import Layout from "./Layout";
import { Router } from "@reach/router";

const App = () => {
  const { connected, disconnect } = useContext(SocketContext);
  return connected ? (
    <Router>
      <Layout disconnect={disconnect} path="/"> 
        <SceneButtons exact path="/" />
        <AudioBoard path="/audio" />
      </Layout>
    </Router>
  ) : (
    <ConnectForm />
  );
};

export default App;
