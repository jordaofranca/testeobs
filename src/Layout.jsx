import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useNavigate, useLocation } from "@reach/router"
import StatusMenu from "./StatusMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    minHeight: 48,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: "auto",
    marginTop: 64,
    padding: 20,
    minWidth: "100%",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    navigate(newValue)
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Tabs
            value={location.pathname}
            onChange={handleChange}
            aria-label="disabled tabs example"
            style={{ flexGrow: 1, paddingRight: 24 }}
          >
            <Tab label="Scenes" value="/" />
            <Tab label="Audio Board" value="/audio" />
          </Tabs>
          <StatusMenu />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{children}</main>
    </div>
  );
}
