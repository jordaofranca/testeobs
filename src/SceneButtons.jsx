import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green, purple } from "@material-ui/core/colors";
import { SocketContext } from "./obsWebsocket";

const ColorButton = withStyles((theme) => ({
  root: {
    minHeight: 100,
    width: "100%",
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function SceneButtons() {
  const classes = useStyles();
  const { obsSocket } = useContext(SocketContext);
  const [currScene, setCurrScene] = useState(null);
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    obsSocket.send("GetSceneList").then((result) => {
      console.log(result);
      const { currentScene, scenes } = result;
      setCurrScene(currentScene);
      setScenes(scenes);
    });
    obsSocket.on("SwitchScenes", (scene) => {
      if (scene.sceneName !== scene) {
        setCurrScene(scene.sceneName);
      }
    });
  }, []);

  const handleChangeScene = (sceneName) => {
    console.log(sceneName)
    window.navigator.vibrate(50);
    obsSocket.send("SetCurrentScene", { 'scene-name': sceneName }).then((result) => {
      setCurrScene(sceneName);
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {scenes.map((scene, idx) => (
          <Grid item xs={6} sm={3} md={2} key={idx}>
            <ColorButton
              variant="contained"
              color={currScene === scene.name ? "secondary" : "primary"}
              className={classes.margin}
              onClick={() => handleChangeScene(scene.name)}
            >
              {scene.name}
            </ColorButton>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
