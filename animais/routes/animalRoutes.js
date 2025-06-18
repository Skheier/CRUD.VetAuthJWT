const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Animal = require('../models/Animal');

//Animais *Autenticação necessária*
router.get('/', authMiddleware, async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar animais' });
  }
});

//Salva novo animal *Autenticação necessária*
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { nome, especie, raca, idade, tutorId } = req.body;
    const animal = new Animal({ nome, especie, raca, idade, tutorId });
    await animal.save();
    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar animal' });
  }
});

module.exports = router;
