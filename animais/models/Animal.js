const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  especie: { type: String, required: true },
  raca: { type: String },
  idade: { type: Number },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pessoa' } // relacionamento opcional
});

module.exports = mongoose.model('Animal', animalSchema);
