require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado - Serviço API'))
  .catch(err => console.log(err));

const servicoRoutes = require('./routes/servicoRoutes');
app.use('/servicos', servicoRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Serviço API rodando na porta ${PORT}`));
