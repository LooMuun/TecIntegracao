const express = require('express');
const router = express.Router();
const fornecedoresController = require('../controllers/controllerFornecedores');

router.get('/fornecedores', fornecedoresController.getFornecedores);
router.post('/fornecedores', fornecedoresController.store);
router.get('/fornecedores/:id', fornecedoresController.getById);

module.exports = router;