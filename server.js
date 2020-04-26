const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/spa-escola'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/spa-escola/index.html');
});

app.listen(process.env.PORT || 3000);
