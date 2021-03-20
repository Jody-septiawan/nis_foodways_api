const express = require('express');
const routers = require("./src/routers");
const app = express();
const port = 5000;

app.use(express.json());

app.use('/api/v1', routers)

app.listen(port, () => console.log(`Your server running on port ${port}`))