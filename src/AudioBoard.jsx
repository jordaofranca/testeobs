import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "./obsWebsocket";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Fader from "./Fader";

const AudioBoard = () => {
  const { obsSocket } = useContext(SocketContext);
  const [sources, setSources] = useState([]);
  useEffect(() => {
    obsSocket.send("GetSourcesList").then((data) => {
      const audioSources = data.sources.filter(
        (src) =>
          src.typeId === "wasapi_input_capture" ||
          src.typeId === "wasapi_output_capture" ||
          src.typeId === "soundtrack_global_source" ||
          src.typeId === "ffmpeg_source" ||
          src.typeId === "dshow_input"
      );
      Promise.all(
        audioSources.map((src) =>
          obsSocket.send("GetVolume", { source: src.name })
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
        alignItems: 'flex-start'
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
