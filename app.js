const bodyParser = require('body-parser');
const express = require('express');


const app = express();
const postRoute = require('./Routes/post.route');
const commentroute = require('./Routes/comments.route');
const userRoute = require('./Routes/user.route');


// app object contain epecial function called use(),
// we can run any things(function or any kind of code block) as a middleware for incomming request.
app.use(bodyParser.json());

app.use("/posts",postRoute);
app.use("/comments",commentroute);
app.use("/user",userRoute);

module.exports = app;