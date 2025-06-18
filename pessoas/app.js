require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado - Pessoa API'))
  .catch(err => console.log(err));

const pessoaRoutes = require('./routes/pessoaRoutes');
app.use('/pessoas', pessoaRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Pessoa API rodando na porta ${PORT}`));
