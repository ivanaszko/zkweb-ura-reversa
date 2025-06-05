const express = require('express');
const router = express.Router();
const db = require('../db/sqlite');
const nodemailer = require('nodemailer');

// Enviar mensagem e salvar no banco
router.post('/', async (req, res) => {
  const { nome, email, telefone, empresa, mensagem } = req.body;

  const sql = `INSERT INTO mensagens (nome, email, telefone, empresa, mensagem) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [nome, email, telefone, empresa, mensagem], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Buscar config SMTP
    db.get('SELECT * FROM smtp_config LIMIT 1', async (err, config) => {
      if (err || !config) return res.status(200).json({ status: 'Mensagem salva, mas SMTP não configurado.' });

      try {
        const transporter = nodemailer.createTransport({
          host: config.host,
          port: config.port,
          secure: config.secure === 1,
          auth: {
            user: config.user,
            pass: config.pass
          }
        });

        await transporter.sendMail({
          from: `"${nome}" <${email}>`,
          to: config.user,
          subject: 'Nova mensagem do site',
          text: mensagem,
          html: `<b>Nome:</b> ${nome}<br><b>Email:</b> ${email}<br><b>Telefone:</b> ${telefone}<br><b>Empresa:</b> ${empresa}<br><b>Mensagem:</b><br>${mensagem}`
        });

        res.json({ status: 'Mensagem enviada com sucesso!' });
      } catch (e) {
        res.status(200).json({ status: 'Mensagem salva, mas erro no envio de e-mail.', error: e.message });
      }
    });
  });
});

module.exports = router;
