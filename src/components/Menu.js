import React from 'react';
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from '@material-ui/icons/Menu';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MeineMensa from './MeineMensa';
import MyHome from './Home';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Gerichte from './Gerichte';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import useStyles from '../functional/UseStyles';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import MensenSicht from './mensenSicht';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Notification from './notification';


const mytheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#76B900',
    }
  },

  typography: {
    fontFamily: `"Open Sans" Roboto Light`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
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
        <Link to="/meine-mensa" className={classes.link}>
          <ListItem>
            <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
            <ListItemText>
              Meine Mensa
            </ListItemText>
          </ListItem>
        </Link>
        <Link to="/meine-gerichte" className={classes.link}>
          <ListItem>
            <ListItemIcon><FastfoodIcon /></ListItemIcon>
            <ListItemText>
              Meine Gerichte
            </ListItemText>
          </ListItem>
        </Link>
        <Link to="/mensen-uebersicht" className={classes.link}>
          <ListItem>
            <ListItemIcon><EmojiFoodBeverageIcon /></ListItemIcon>
            <ListItemText>
              Mensen Übersicht
            </ListItemText>
          </ListItem>
        </Link>
        <Link to="/benachrichtigungen" className={classes.link}>
          <ListItem>
            <ListItemIcon><NotificationsActiveIcon /></ListItemIcon>
            <ListItemText>
              Benachrichtigungen
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
          <Grid key="GridKey">
            <MuiThemeProvider theme={mytheme}>
              <React.Fragment key={anchor}>
                <AppBar title="Login" position="static" color="primary">
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

                        <Route exact path="/meine-mensa">
                          Meine Mensa
              </Route>
                        <Route exact path="/meine-gerichte">
                          Meine Gerichte
              </Route>
                        <Route exact path="/mensen-uebersicht">
                          Mensen Übersicht
              </Route>
                        <Route exact path="/benachrichtigungen">
                        Benachrichtigungen
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
                      <MyHome key="MyHOmeKey"/>
                    </Route>
                    <Route exact path="/mensen-uebersicht">

                      <MensenSicht />

                    </Route>
                    <Route exact path="/meine-mensa">
                      <MeineMensa key="tableModeButton16"/>
                    </Route>
                    <Route exact path="/meine-gerichte">
                      <Gerichte key="tableModeButton17"/>
                    </Route>
                    <Route exact path="/benachrichtigungen">
                      <Notification key="tableModeButton18"/>
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
