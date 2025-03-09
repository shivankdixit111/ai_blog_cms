const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoute.js')
const authRoute = require('./routes/auth-route.js')
const cors = require('cors')
dotenv.config();
const app = express();
app.use(express.json())

/** ------  connecting frontnd  ----- */
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}
app.use(cors(corsOptions))

mongoose.connect(process.env.DB_URL)
.then(()=> console.log('Connected to DB'))
.catch((error)=>console.log('Failed to connect to DB'));


app.use("/api/blogs", blogRoutes)
app.use("/api/user", authRoute)

app.get('/', (req, res)=>{
    res.send('hellodfasd')
})   


app.listen(3000, ()=>{
    console.log('server is listening on port 3000')
})