const express = require('express');
const router = express.Router();
const db = require('../db/sqlite');

// Listar todos os planos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM planos ORDER BY destaque DESC, id ASC';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Cadastrar novo plano
router.post('/', (req, res) => {
  const { nome, descricao, valor, frequencia, beneficios, destaque } = req.body;
  const sql = `
    INSERT INTO planos (nome, descricao, valor, frequencia, beneficios, destaque)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [nome, descricao, valor, frequencia, beneficios, destaque ? 1 : 0], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ status: 'Plano cadastrado com sucesso.', id: this.lastID });
  });
});

module.exports = router;

