const express = require('express');
const connectDB = require('./config/db');


const app = express();
//connect DB
connectDB();

//init middleware
app.use(express.json({extended: false}));



app.get('/', (req, res) => res.json({msg: 'Welcome to contact keeper'}));




// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server has started on ${PORT}`));