import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "./obsWebsocket";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Fader from "./Fader";

const AudioBoard = () => {
  const { obsSocket } = useContext(SocketContext);
  const [sources, setSources] = useState([]);
  useEffect(() => {
    obsSocket.send("GetSpecialSources").then((data) => {
      const audioSources = Object.keys(data).filter(
        (key) => key.indexOf("desktop") === 0 || key.indexOf("mic") === 0
      );
      Promise.all(
        audioSources.map((key) =>
          obsSocket.send("GetVolume", { source: data[key] })
        )
      ).then((values) => {
        setSources(values);
      });
    });
  }, [obsSocket]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Grid container spacing={2}>
        {sources.map((src) => (
          <Grid item xs={6} sm={3} md={2} key={src.name}>
            <Paper
              style={{
                display: "flex",
                flexWrap: "wrap",
                height: "100%",
              }}
            >
              <Fader src={src} onChange={(v) => console.log(v)} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AudioBoard;
