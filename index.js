const connectToMongo = require('./db');
const express = require('express')
const path= require('path')
const dotenv = require('dotenv')
const app = express()
var cors = require('cors')
dotenv.config();

connectToMongo();


const port = process.env.PORT || 6000;

// Available routes

app.use(cors())

app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


if ( process.env.NODE_ENV == "production"){
    app.use(express.static("inotebook/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'inotebook', 'build', 'index.html'));
    })

}


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://127.0.0.1:${port}`)
})

