const express = require('express');
const cors = require('cors');
const produtoRoutes = require('./routes/produtoRoutes'); // ajuste o caminho se necessário

const app = express();

app.use(cors());
app.use(express.json());

// Usando as rotas
app.use(produtoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});