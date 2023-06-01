require("dotenv").config();

module.exports = {
  mongo: {
    url: process.env.MONGO_URL,
    db: process.env.MONGO_DB,
  },
};
