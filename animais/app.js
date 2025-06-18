require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado - Animal API'))
  .catch(err => console.log(err));

// Importar rotas
const animalRoutes = require('./routes/animalRoutes');
app.use('/animais', animalRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Animal API rodando na porta ${PORT}`));
