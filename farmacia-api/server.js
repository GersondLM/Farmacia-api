const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const medicamentoRouter = require('./router/medicamentoRouter');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', medicamentoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
