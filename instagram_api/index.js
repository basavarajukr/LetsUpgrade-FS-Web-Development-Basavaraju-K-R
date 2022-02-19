const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//importing routers for routing
const userRouter=require('./controllers/user');
const postRouter = require('./controllers/post');
const connectionRouter = require('./controllers/connection');
const commentRouter = require('./controllers/comment');
const likeRouter = require('./controllers/like');
const chatRouter = require('./controllers/chat');


mongoose.connect("mongodb://localhost:27017/instagram")
.then(()=>{console.log("connection established")})
.catch((err)=>{console.log(err)})

const app=express();

app.use(cors());
app.use(express.json());

app.use("/user",userRouter);
app.use("/post",postRouter);
app.use("/connection",connectionRouter);
app.use("/chat",chatRouter);
app.use("/like",likeRouter);
app.use("/comment",commentRouter);

app.listen(8000);