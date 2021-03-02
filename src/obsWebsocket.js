import React, { useEffect, useState, createContext } from "react";
import OBSWebSocket from "obs-websocket-js";

export const SocketContext = createContext();
const obs = new OBSWebSocket();

const SocketProvider = ({ children }) => {
  const [obsSocket, setObsSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const init = ({ url, password }) => {
    return new Promise((resolve, reject) => {
      const port = parseInt(url.split(':')[1]);
      const options = {
        address: url,
        password: password,
        secure: port === 443
      };
      console.log("options: ", options);
      obs
        .connect(options)
        .then(() => {
          console.log("connected: ", options);
          setObsSocket(obs);
          setConnected(true);
          resolve(url);
        })
        .catch((err) => {
          // Promise convention dicates you have a catch on every chain.
          console.log(err);
          reject(err);
        });
    });
  };
  const disconnect = () => {
    return obs.disconnect();
  };
  useEffect(() => {
    obs.on("ConnectionClosed", (data) => {
      console.log("disconnected");
      setConnected(false);
      setObsSocket(null);
    });
    // You must add this handler to avoid uncaught exceptions.
    obs.on("error", (err) => {
      console.error("socket error:", err);
      if (err.code === "NOT_CONNECTED") {
        debugger;
        setConnected(false);
        setObsSocket(null);
      }
    });
    return () => {
      obs.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ obsSocket, connected, init, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
