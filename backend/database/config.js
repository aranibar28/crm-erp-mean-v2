const mongoose = require("mongoose");

const db_connection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting");
  }
};

module.exports = {
  db_connection,
};
