const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 3090;

app.listen(PORT);