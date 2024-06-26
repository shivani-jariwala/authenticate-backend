const config = require('./config');
config.initializeConfig();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require("./routes/index"))

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

