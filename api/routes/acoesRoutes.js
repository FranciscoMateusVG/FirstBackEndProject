const express = require('express');
const router = express.Router();
const acoesController = require('../controllers/acoesController');

//Descontruct
const {
	getAcoes,
	insereAcao,
	buscaAcao,
	atualizaAcaoAdicionando,
	atualizaAcaoDeletando,
	deletaAcao
} = acoesController;

//GET ALL
router.get('/', getAcoes);

//POST
router.post('/', insereAcao);

//GET ONE
router.get('/:codigo', buscaAcao);

//UPDATE
router.put('/:nome', atualizaAcaoAdicionando);
router.put('/deleta/:nome', atualizaAcaoDeletando);

//DELETE
router.delete('/:codigo', deletaAcao);

module.exports = router;
