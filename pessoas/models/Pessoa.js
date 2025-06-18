const mongoose = require('mongoose');

const pessoaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  telefone: { type: String },
  endereco: { type: String }
});

module.exports = mongoose.model('Pessoa', pessoaSchema);
