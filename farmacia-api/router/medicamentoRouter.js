const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');

// Rutas
router.get('/medicamentos', medicamentoController.getMedicamentos);
router.get('/:id', medicamentoController.getMedicamentoById);
router.post('/', medicamentoController.createMedicamento); // Aquí debes tener definido createMedicamento
router.put('/:id', medicamentoController.updateMedicamento);
router.delete('/:id', medicamentoController.deleteMedicamento);

module.exports = router;

