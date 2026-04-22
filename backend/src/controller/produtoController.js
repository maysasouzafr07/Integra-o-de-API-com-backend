const pool = require('../config/db');

const produtoController = {
  // GET /produtos
  listar: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM produto ORDER BY id ASC');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  },

  // POST /produtos
  criar: async (req, res) => {
    const { titulo, marca, descricao, valor } = req.body;

    // Validações Requisitadas
    if (!titulo || !marca || valor === undefined) {
      return res.status(400).json({ error: "Título, Marca e Valor são obrigatórios." });
    }
    if (isNaN(valor)) {
      return res.status(400).json({ error: "O valor deve ser um número." });
    }

    try {
      const query = 'INSERT INTO produto (titulo, marca, descricao, valor) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [titulo, marca, descricao, valor];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Erro ao inserir produto:', err.message);
      res.status(500).json({ error: "Erro ao inserir produto." });
    }
  },

  // DELETE /produtos/:id
  deletar: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query('DELETE FROM produto WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Produto não encontrado." });
      }
      res.status(200).json({ message: "Produto excluído com sucesso.", produto: result.rows[0] });
    } catch (err) {
      console.error('Erro ao deletar produto:', err.message);
      res.status(500).json({ error: "Erro ao deletar produto." });
    }
  }
};

module.exports = produtoController;