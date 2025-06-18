const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, senha } = req.body;

  // Verifica se usuário já existe
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ error: 'Usuário já existe...' });

  // Criptografa a senha
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(senha, salt);

  // Criar usuário
  const user = new User({ username, passwordHash });
  await user.save();

  res.status(201).json({ message: ' Usuário registrado com sucesso!! ' });
};

exports.login = async (req, res) => {
  const { username, senha } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Usuário ou senha inválido(s)!' });

  const validPass = await bcrypt.compare(senha, user.passwordHash);
  if (!validPass) return res.status(400).json({ error: 'Usuário ou senha inválido(s)!' });

  // Gera o token JWT
  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h' //delimita o tempo de validade do token
  });

  res.json({ token }); 
};
