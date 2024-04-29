const express =require("express");
const server =express();
const router=require("./controller/apiController")
const cors = require('cors');
const bodyParser = require('body-parser');

server.use(cors());
server.use("/api",router);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


server.listen(8085,()=>{
    console.log("server start!");
    console.log("http://127.0.0.1:8085/");
})