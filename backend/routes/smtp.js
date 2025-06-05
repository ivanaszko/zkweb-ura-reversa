const express = require('express');
const router = express.Router();
const db = require('../db/sqlite');

// Obter configurações SMTP
router.get('/', (req, res) => {
  db.get('SELECT * FROM smtp_config LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});

// Atualizar configurações SMTP
router.post('/', (req, res) => {
  const { host, port, user, pass, secure } = req.body;

  db.run('DELETE FROM smtp_config');
  db.run(
    `INSERT INTO smtp_config (host, port, user, pass, secure) VALUES (?, ?, ?, ?, ?)`,
    [host, port, user, pass, secure ? 1 : 0],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ status: 'Configurações SMTP atualizadas com sucesso.' });
    }
  );
});

module.exports = router;
