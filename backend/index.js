const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const RegisterLogin =  require('./register-login/reg-log.js');
const EvaluateMockTest =  require('./eval/eval.js');
const {DBConnection} = require('./db/dbConnect.js')

const app = express();

dotenv.config();

//add middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Connect to MongoDB Cluster
DBConnection();

// All ports
app.use('/user',RegisterLogin);
app.use('/eval-mocktest',EvaluateMockTest);

app.post('/upload',async (req,res)=>{
    const {files} = req.body;
})

app.listen(process.env.PORT,()=>{
    console.log(`App is listening to port ${process.env.PORT}`);  
})

