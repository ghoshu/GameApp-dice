import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    opacity: 0.9,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ auth: { isAuthenticated, user, loading }, logout }) => {
  const classes = useStyles();

  const authLinks = (
    <>
      <Typography variant="h6">
        Welcome {user ? user.nickname : ""} !
        <Button
          edge="end"
          className={classes.menuButton}
          onClick={logout}
          color="inherit"
          size="large"
        >
          <Tooltip title="Logout">
            <Icon className="fas fa-sign-out-alt" />
          </Tooltip>
        </Button>
      </Typography>
    </>
  );

  const guestLinks = (
    <>
      <Typography color="inherit">
        <Link color="inherit" href="/login">
          Login
        </Link>
      </Typography>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            variant="h5"
          >
            <i className="fas fa-dice"></i> Game of Dice
          </Typography>
          <Typography className={classes.root}> </Typography>
          {!loading && isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

// const Navbar = ({ auth: { isAuthenticated, user, loading }, logout }) => {
//   const authLinks = (
//     <ul>
//       <li>
//         <h4>Welcome {user ? user.nickname : ""} ! </h4>
//       </li>
//       <li>
//         <a onClick={logout} href="#!">
//           <i className="fas fa-sign-out-alt" />{" "}
//           <span className="hide-sm">Logout</span>
//         </a>
//       </li>
//     </ul>
//   );

//   const guestLinks = (
//     <ul>
//       <li>
//         <Link to="/login">Login</Link>
//       </li>
//     </ul>
//   );

//   return (
//     <nav className="navbar bg-dark">
//       <h1>
//         <i className="fas fa-dice"></i> Game of Dice
//       </h1>
//       <Fragment>
//         {!loading && isAuthenticated ? authLinks : guestLinks}
//       </Fragment>
//     </nav>
//   );
// };
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
