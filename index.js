const express = require('express');
require('dotenv').config();
const app = express();

require('./startup/db')();
require('./startup/router')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));