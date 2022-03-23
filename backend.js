const PORT = 4000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
