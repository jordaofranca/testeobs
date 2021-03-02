import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { SocketContext } from "./obsWebsocket";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { addConnection, getConnections, deleteConn } from "./pouchDB";
import SavedConns from "./SavedConns";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    width: "100%",
    marginBottom: 20,
  },
}));

export default function SignIn() {
  const { init } = useContext(SocketContext);
  const [connections, setConnections] = useState(null);
  const [save, setSave] = useState(false);
  const classes = useStyles();
  const handleSave = (e) => {
    setSave(e.target.checked);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { url, password, name } = e.target;
    init({ url: url.value, password: password.value })
      .then((resolve) => {
        if (save) {
          addConnection({
            url: url.value,
            password: password.value,
            name: name.value,
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (connection) => {
    deleteConn(connection, (err, result) => {
      if (!err) {
        setConnections(
          connections.filter(
            (conn) => conn._id === result.id && conn._rev === result.rev
          )
        );
      } else {
        console.error(err);
      }
    });
  };
  useEffect(() => {
    getConnections()
      .then((res) => {
        setConnections(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connect
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="url"
            label="url Address"
            name="url"
            autoComplete="url"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox checked={save} onChange={handleSave} />}
            label="Add to Saved"
          />
          {save && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Connection name"
              id="name"
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>

        {connections && connections.length > 0 && (
          <>
            <Divider className={classes.divider} />
            <SavedConns conns={connections} onDelete={handleDelete} />
          </>
        )}
      </div>
    </Container>
  );
}
