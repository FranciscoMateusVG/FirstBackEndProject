const express = require('express');
const router = express.Router();
const acoesController = require('../controllers/acoesController');

//Descontruct
const {
  getAcoes,
  insereAcao,
  buscaAcao,
  atualizaAcao,
  deletaAcao
} = acoesController;

//GET ALL
router.get('/', getAcoes);

//POST
router.post('/', insereAcao);

//GET ONE
router.get('/:codigo', buscaAcao);

//UPDATE
router.put('/:codigo', atualizaAcao);

//DELETE
router.delete('/:codigo', deletaAcao);

module.exports = router;
