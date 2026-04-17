const { Pool } = require('pg');
require('dotenv').config();

// Se o seu .env tiver as variáveis, ele pega daqui. 
// Caso contrário, você pode colocar as strings direto para testar.
const pool = new Pool({
  user: process.env.DB_USER ,
  host: process.env.DB_HOST ,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD ,
  port: process.env.DB_PORT ,
});

module.exports = pool;