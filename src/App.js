import React, { useContext } from "react";
import { SocketContext } from "./obsWebsocket";
import AudioBoard from "./AudioBoard";
import SceneButtons from "./SceneButtons";
import ConnectForm from "./ConnectForm";
import Layout from "./Layout";
import Divider from "@material-ui/core/Divider";

const App = () => {
  const { connected, disconnect } = useContext(SocketContext);
  return connected ? (
    <Layout disconnect={disconnect}>
      <SceneButtons />
      <Divider style={{margin: '20px 0'}} />
      <AudioBoard />
    </Layout>
  ) : (
    <ConnectForm />
  );
};

export default App;
