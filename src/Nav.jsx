import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { SocketContext } from "./obsWebsocket";

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
}));

export const MainListItems = () => (
  <List>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
  </List>
);

export const SecondaryListItems = () => {
  const { toggleStream, streaming, disconnect } = useContext(SocketContext);

  return (
    <List>
      <ListSubheader inset>Options</ListSubheader>
      <ListItem button onClick={toggleStream}>
        <ListItemIcon>
          {streaming ? (
            <PlayCircleFilledWhiteIcon color="secondary" />
          ) : (
            <PlayCircleOutlineIcon />
          )}
        </ListItemIcon>
        <ListItemText primary={streaming ? "Stop Stream" : "Start Stream"} />
      </ListItem>
      <ListItem button onClick={disconnect}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
};

const Nav = ({ closeDrawer }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbarIcon}>
        <IconButton onClick={closeDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      {/* <Divider />
      <MainListItems /> */}
      <Divider />
      <SecondaryListItems />
    </div>
  );
};

export default Nav;
