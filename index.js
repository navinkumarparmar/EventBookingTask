const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = 3003;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
const connectDB = require('./models/db')
connectDB()
const routes = require('./routes/index')


app.use('/api',routes);


app.listen(PORT,()=>{
    console.log(`your server is running on port ${PORT}`)
})