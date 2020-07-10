import React from 'react';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from '@material-ui/icons/Menu';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import HelpIcon from '@material-ui/icons/Help';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MensaSelect from './SelectMensa';
import MeineMensa from './MeineMensa';
import MyHome from './Home';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Gerichte from './Gerichte';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';


const mytheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#76B900',
    },
  },

  overrides: {
    // Style sheet name ⚛️
    MuiIconButton: {
      // Name of the rule
      palette: {
        // Some CSS
        primary: {
          main: '#76B900',
        }
      },
    },
  },

});

const useStyles = makeStyles({

  FormControl:{
    minWidth: 12000
  },
  list: {
    width: 200
  },
  fullList: {
    width: "auto"
  },
  link: { textDecoration: 'none' },

  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#76B900',
    },
  }
});

export default function SimpleMenu() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/" className={classes.link}>
          <ListItem>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText>
              Home
            </ListItemText>
          </ListItem>
        </Link>
        <Link to="/mensa" className={classes.link}>
          <ListItem>
            <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
            <ListItemText>
              Meine Mensa
            </ListItemText>
          </ListItem>
        </Link>
        <Link to="/lovefood" className={classes.link}>
          <ListItem>
            <ListItemIcon><FastfoodIcon /></ListItemIcon>
            <ListItemText>
              Meine Gerichte
            </ListItemText>
          </ListItem>
        </Link>

      </List>

    </div>
  );

  return (
    <Router>
      <div>
        {["left"].map(anchor => (
          <Grid >
            <MuiThemeProvider theme={mytheme}>
              <React.Fragment key={anchor}>
                <AppBar title="Login" position="static" onLef color="primary">
                  <Toolbar>

                    <IconButton edge="start" color="secondary" aria-label="menu">
                      <MenuIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
                      {/* <img src="\in_app_logo_big.png" alt="Mensa-Wissen App Logo"/> */}

                    </IconButton>

                    <Typography variant="h6" color="secondary">
                      <Switch>
                        <Route exact path="/">
                          Home
              </Route>

                        <Route exact path="/mensa">
                          Hilfe
              </Route>
                        <Route exact path="/lovefood">
                          Meine Gerichte
              </Route>
                      </Switch>

                    </Typography>

                    <Grid item xs />
                    <Grid item>
                      <IconButton>
                        <img src="\in_app_logo_big.png" alt="Mensa-Wissen App Logo" />
                      </IconButton>
                    </Grid>

                  </Toolbar>

                </AppBar>

                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
                <div>
                  <Switch>
                    <Route exact path="/">
                      <MyHome />
                    </Route>
                    <Route exact path="/test">
                      <br />
                      <h2 id='mensawissen'>DANKE, DASS SIE MENSA-WISSEN NUTZEN</h2>
                      <br />
                      <TextField
                        required
                        id="outlined-required"
                        label="Benutzer neu"
                        margin='normal'
                      /><div /><br /><br />
                      <TextField
                        required
                        id="outlined-password-input"
                        type="password"
                        label="Password neu"
                        margin='normal'
                      />
                      <MensaSelect />

                      <Button variant="contained">
                        Bestätigen
        	            </Button>
                    </Route>
                    <Route exact path="/mensa">
                      <MeineMensa />
                    </Route>
                    <Route exact path="/lovefood">
                      <Gerichte />
                    </Route>
                  </Switch></div>
              </React.Fragment>
            </MuiThemeProvider>
          </Grid>
        ))}
      </div>
    </Router>
  );

}
