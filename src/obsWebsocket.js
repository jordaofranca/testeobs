import React, { useEffect, useState, createContext } from "react";
import OBSWebSocket from "obs-websocket-js";

export const SocketContext = createContext();
const obs = new OBSWebSocket();

const SocketProvider = ({ children }) => {
  const [obsSocket, setObsSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const init = ({ url, password }) => {
    return new Promise((resolve, reject) => {
      const options = {
        address: url,
        password: password,
        secure: window.location.protocol === "https:",
      };
      obs
        .connect(options)
        .then(() => {
          obs.sendCallback("GetStreamingStatus", (err, result) => {
            if (!err) {
              setStreaming(result.streaming);
            }
          });
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
    obs.on("StreamStarted", (result) => {
      setStreaming(true);
    });
    obs.on("StreamStopped", (result) => {
      setStreaming(false);
    });
    return () => {
      obs.disconnect();
    };
  }, []);

  const toggleStream = () => {
    obs.send("StartStopStreaming");
  };

  return (
    <SocketContext.Provider
      value={{
        obsSocket,
        connected,
        streaming,
        init,
        disconnect,
        toggleStream,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
