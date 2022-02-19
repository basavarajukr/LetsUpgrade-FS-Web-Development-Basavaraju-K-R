const express = require('express');

const productRouter = require('./products');
const customerRouter = require('./customers');

const app = express();

app.use("/products",productRouter);
app.use("/customers",customerRouter);







app.listen(8000);