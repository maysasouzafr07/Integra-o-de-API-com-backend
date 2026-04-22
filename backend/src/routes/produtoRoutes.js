const express = require('express');
const router = express.Router();
const produtoController = require('../controller/produtoController');

router.get('/', produtoController.listar);
router.post('/', produtoController.criar);
router.delete('/:id', produtoController.deletar);

module.exports = router;