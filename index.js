const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
require("dotenv").config()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send({
        message: 'Your API is working fine!..'
    })
})

app.listen(port, async()=>{
    try {
        await connection;
        console.log(`Database is connected successfully!..${port}`);
    } catch (error) {
        console.log(`Something went wrong!..${error}`);
    }
    console.log("Server is running on the port number", port)
})