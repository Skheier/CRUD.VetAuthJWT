const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Servico = require('../models/Servico');
//const Animal = require('../models/Animal');

// Listar serviços *protegido*
router.get('/', authMiddleware, async (req, res) => {
  try {
    //const servicos = await Servico.find().populate('animalId');
    const servicos = await Servico.find(); //mechido
    res.json(servicos);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    res.status(500).json({ error: 'Erro ao buscar serviços' });
  }
});


// Cadastrar serviço *protegido*
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { tipo, data, valor, status, animalId } = req.body;
    const servico = new Servico({ tipo, data, valor, status, animalId });
    await servico.save();
    res.status(201).json(servico);
  } catch (error) {
    res.status(400).json({ error: 'EErro ao cadastrar o serviço' });
  }
});

module.exports = router;