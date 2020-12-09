const mongoose = require("mongoose");
const config = require("config");

const db = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster-u.l4pog.gcp.mongodb.net/gameapp?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
