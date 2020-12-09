import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Game from "./Game";
import Spinner from "./Spinner";

const Landing = ({ user, isAuthenticated }) => {
  if (user != null && isAuthenticated) {
    if (user.admin) {
      return <Redirect to="/admin" />;
    } else {
      return <Game />;
    }
  } else {
    return <Spinner />;
  }
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Landing);
