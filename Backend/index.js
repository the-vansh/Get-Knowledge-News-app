const { response } = require('express');
const express = require('express');
const mongodb = require('mongodb');
var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/notes',require('./Routes/notes'));
app.listen(8000);