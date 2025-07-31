require("./config/env"); // Loads .env before anything else

const express = require("express");
const app = express();

// Now all process.env variables are accessible
console.log("App running on PORT:", process.env.PORT || 3000);
