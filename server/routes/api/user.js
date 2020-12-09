const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
const User = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("username", "Username is required").not().isEmpty(),
    check("nickname", "Nickname is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, nickname, password } = req.body;

    try {
      let user = await User.findOne({ username });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        username,
        nickname,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    PUT api/users/update/:id
// @desc     Uupdate Score
// @access   Private
router.put(
  "/update/:id",
  [
    auth,
    checkObjectId("id"),
    check("score", "Score is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (user.played >= 3) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User has played more than 3 times" }] });
      } else if (user.played == 0) {
        // update the score
        let currentdate = new Date();
        user.startdate = currentdate;
        let newScore = parseInt(req.body.score);

        user.score = user.score + newScore;
        user.played = user.played + 1;
      } else if (user.played > 0 && user.played <= 3) {
        // update the score
        let currentdate = new Date();
        user.duration = currentdate.getTime() - user.startdate.getTime();
        let newScore = parseInt(req.body.score);

        user.score = user.score + newScore;
        user.played = user.played + 1;
      }

      await user.save();

      return res.json(user);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @route    GET api/users
// @desc     Get All Data
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.find();

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

module.exports = router;