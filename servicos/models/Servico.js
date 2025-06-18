const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema({
  tipo: { type: String, required: true }, 
  data: { type: Date, required: true },
  valor: { type: Number, required: true },
  status: { type: String, default: 'pendente' }, 
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true }
});

module.exports = mongoose.model('Servico', servicoSchema);
