const connectToMongo = require('./db');
const express = require('express')
const path= require('path')
const dotenv = require('dotenv')
dotenv.config();

connectToMongo();
// client;
const app = express()
const port = process.env.PORT || 6000;
console.log(port)
// Available routes
var cors = require('cors')
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
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})

