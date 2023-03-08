const express = require('express');
const path = require('path')
//const { default: mongoose } = require('mongoose');
const connectDB = require('./config/db');
const http = require('http')
const app = express();

connectDB();

// app.post("/", (req, res) => {
//     res.send('This is it')
// })
//init middleware
app.use(express.json({extended: false}));
// Define Routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use(express.static('main/build'));

app.get('*', (req, res)=> res.sendFile(path.resolve(__dirname, 'main', 'build', 'index.html')))
//server static assets in production
if(process.env.NODE_ENV === 'production'){
    //Set Static folder
    app.use(express.static('main/build'));

    app.get('*', (req, res)=> res.sendFile(path.resolve(__dirname, 'main', 'build', 'index.html')))
}
// app.get('/', (req, res) => res.json({msg: 'Welcome to contact keeper'}));
const server = http.createServer(app);
const PORT = process.env.PORT || 9500;
server.listen(PORT, () => console.log(`server has started on ${PORT}`));