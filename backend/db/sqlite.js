const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Tabela de planos
db.run(`
  CREATE TABLE IF NOT EXISTS planos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    valor TEXT NOT NULL,
    frequencia TEXT NOT NULL,
    beneficios TEXT NOT NULL,
    destaque INTEGER DEFAULT 0
  )
`);

// Tabela de mensagens de contato
db.run(`
  CREATE TABLE IF NOT EXISTS mensagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    telefone TEXT,
    empresa TEXT,
    mensagem TEXT,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Tabela de configuração SMTP
db.run(`
  CREATE TABLE IF NOT EXISTS smtp_config (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    host TEXT,
    port INTEGER,
    user TEXT,
    pass TEXT,
    secure INTEGER
  )
`);

module.exports = db;
