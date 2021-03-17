import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { SocketContext } from "./obsWebsocket";
import { white } from '@material-ui/core/colors';

export default function StatusMenu() {
  const { toggleStream, streaming, disconnect } = useContext(SocketContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggleStream = () => {
    toggleStream()
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{color: 'white'}}
      >
        {streaming ? "LIVE" : "OFFLINE"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleToggleStream}>{streaming ? "Stop Stream" : "Start Stream"}</MenuItem>
        <MenuItem onClick={disconnect}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
