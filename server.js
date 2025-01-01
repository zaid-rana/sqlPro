const express = require('express');
const app = express();
const mysqlPool = require('./config/db')
const cors = require('cors');


const PORT = 3000;
app.use(cors());
app.use(express.json());


//middleware
app.use(cors({ origin: 'http://127.0.0.1:5500' }));


//routes
app.use("/api/v1/passengers" , require("./routes/passengers.routes"));
app.get('/test' , (req , res)=>{
    res.send("server");
});

//listen
mysqlPool.query('SELECT 1').then(()=>{
    console.log('my SQL DB connected');
}).catch((error)=>{
    console.log(error);
})

app.listen(PORT , ()=>{
    console.log(`server running on ${PORT}`);
});