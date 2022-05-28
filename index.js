const express = require('express');
const config = require('config');

const app = express();

const PORT = config.get('port') || 5001;

app.listen(PORT, () => console.log(`application is listening on ${PORT}`));
