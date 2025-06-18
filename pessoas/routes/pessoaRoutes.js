const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Pessoa = require('../models/Pessoa');

// Listar todas as pessoas *Autenticação necessária*
router.get('/', authMiddleware, async (req, res) => {
  try {
    const pessoas = await Pessoa.find();
    res.json(pessoas);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno ao buscar pessoas' });
  }
});



// Cadastrar pessoa *Autenticação necessária*
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { nome, cpf, telefone, endereco } = req.body;
    const pessoa = new Pessoa({ nome, cpf, telefone, endereco });
    await pessoa.save();
    res.status(201).json(pessoa);
    
  } catch (error) {res.status(400).json({ error: 'EErro ao cadastrar cliente' });}
});

module.exports = router;
