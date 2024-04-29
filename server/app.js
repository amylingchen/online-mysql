const express =require("express");
const server =express();
const router=require("./controller/apiController")
const cors = require('cors');

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Access-Control-Allow-Origin",
    credentials: true
}
server.use("/api",router);
//get all states to show
server.use(express.urlencoded({extended:false}));
server.use(express.json);
server.use(cors());


server.listen(8085,()=>{
    console.log("server start!");
    console.log("http://localhost:8085/");
})