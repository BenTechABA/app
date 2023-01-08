const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('<h1>Hello world</h1>'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server has started on ${PORT}`));