const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas
const planosRoutes = require('./routes/planos');
const contatoRoutes = require('./routes/contato');
const smtpRoutes = require('./routes/smtp');

app.use('/api/planos', planosRoutes);
app.use('/api/contato', contatoRoutes);
app.use('/api/smtp', smtpRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
