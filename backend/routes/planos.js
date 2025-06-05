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

module.exports = router;
