const express = require('express');
require('dotenv').config();
const cors = require('cors');
const initRoutes = require('./routes/index');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
    console.log(`Server is running on the port ${listener.address().port}`);
});
