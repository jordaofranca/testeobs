import React, { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Chip from "@material-ui/core/Chip";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import Fab from "@material-ui/core/Fab";
import { mulToDb } from "./helpers";
import { SocketContext } from "./obsWebsocket";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100% -' + (theme.spacing(3) * 2 - 48) + ')',
    maxHeight: 500,
    minHeight: 350,
    width: '100%',
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
    margin: "32px 0",
    boxSizing: 'border-box'
  },
  thumb: {
    height: 24,
    width: 56,
    borderRadius: 6,
    backgroundColor: "#currentColor",
    border: "2px solid currentColor",
    transform: `translateX(calc(-50% + 5px))`,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(50% - 16px)",
  },
  track: {
    height: 8,
    width: 4,
    border: 'solid #666',
    borderRadius: 4,
    boxSizing: 'border-box',
    transform: 'translateX(-3px)'
  },
  rail: {
    height: 8,
    width: 4,
    borderRadius: 4,
    border: 'solid #999',
    boxSizing: 'border-box',
    transform: 'translateX(-3px)'
  },
})(Slider);

export default function CustomizedSlider({ src }) {
  const [volume, setVolume] = useState(src.volume);
  const [muted, setMuted] = useState(src.muted);
  const classes = useStyles();
  const { obsSocket } = useContext(SocketContext);

  const toggleMuteSource = () => {
    navigator.vibrate(50)
    obsSocket.send("ToggleMute", { source: src.name });
  };
  const handleSetVolume = (volume) => {
    obsSocket.send("SetVolume", { source: src.name, volume, useDecibel: true });
  };

  useEffect(() => {
    obsSocket.on("SourceVolumeChanged", (data) => {
      if (data.sourceName === src.name) {
        setVolume(data.volume);
      }
    });
    obsSocket.on("SourceMuteStateChanged", (data) => {
      if (data.sourceName === src.name) {
        setMuted(data.muted);
      }
    });
  }, [obsSocket, src.name]);

  return (
    <div className={classes.root}>
      <Tooltip title={src.name} aria-label={src.name}>
        <Chip label={src.name.slice(0, 14)} color="primary" />
      </Tooltip>
      <PrettoSlider
        min={-100}
        max={0}
        step={0.01}
        orientation="vertical"
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={src.value}
        value={mulToDb(volume)}
        onChange={(e, v) => handleSetVolume(v)}
      />
      <Fab
        color={muted ? "secondary" : undefined}
        aria-label="edit"
        style={{ flexShrink: 0 }}
        onClick={toggleMuteSource}
      >
        {muted ? <VolumeOffIcon /> : <VolumeMuteIcon />}
      </Fab>
    </div>
  );
}
