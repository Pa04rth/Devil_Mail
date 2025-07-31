const path = require("path");
const dotenv = require("dotenv");

// Load .env file from root directory
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});
