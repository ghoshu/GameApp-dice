import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { updateScore } from "../../actions/game";
import D1 from "../../img/clipart_1.png";
import D2 from "../../img/clipart_2.png";
import D3 from "../../img/clipart_3.png";
import D4 from "../../img/clipart_4.png";
import D5 from "../../img/clipart_5.png";
import D6 from "../../img/clipart_6.png";
import { loadUser } from "../../actions/auth";
import Spinner from "./Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(6),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: "5rem",
  },
  grid: {
    padding: "2rem",
  },
}));

const Game = ({ user, updateScore, loadUser }) => {
  const classes = useStyles();
  useEffect(() => {
    setrolling(false);
  }, [user]);

  // const count = user.played;
  const images = { 1: D1, 2: D2, 3: D3, 4: D4, 5: D5, 6: D6 };
  //   const sides = ["1", "2", "3", "4", "5", "6"];
  const [rolling, setrolling] = useState(false);
  const [newScore, setNewscore] = useState(0);
  const diceCount = () => {
    setrolling(true);
    const newvalue = Math.floor(Math.random() * 6) + 1;
    updateScore(user._id, { score: newvalue });
    setNewscore(newvalue);
  };

  const gameBegin = (
    <>
      <Grid item xs={12} className={classes.grid}>
        <Typography variant="h2">Game {user ? user.played : 0}/ 3</Typography>
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <img
          src={newScore ? images[newScore] : D1}
          alt="img"
          style={{ width: "150px" }}
        />
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <Button
          size="large"
          color="primary"
          disabled={rolling}
          onClick={() => diceCount()}
          variant="contained"
        >
          Random
          {rolling && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </Grid>
    </>
  );
  const gameEnd = (
    <>
      <Grid item xs={12}>
        <Typography variant="h2">Thank You !</Typography>
        <Typography color="primary" variant="h5">
          Your Total Score : {user.score}
        </Typography>
      </Grid>
    </>
  );

  return (
    <div className={classes.root}>
      {user == null ? (
        <Spinner />
      ) : (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={9}
        >
          <Paper elevation={0} className={classes.paper}>
            {user.played >= 3 ? gameEnd : gameBegin}
          </Paper>
        </Grid>
      )}
    </div>
  );
};

Game.propTypes = {
  isAuthenticated: PropTypes.bool,
  updateScore: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateScore, loadUser })(Game);
