const Acao = require('../models/acao');

//Busca todas as Açoes
exports.getAcoes = (req, res) => {
	Acao.find((err, document) => {
		if (err) {
			console.log(err);
		} else {
			console.log(document);
			res.status(200).json({ acoes: document });
		}
	}).catch(err => {
		console.log(err);
		res.status(500).json({ message: err });
	});
};

//Insere novas Açoes
exports.insereAcao = (req, res) => {
	const acao = new Acao({
		Nome: req.body.Nome,
		Tipo: req.body.Tipo,
		Codigo: req.body.Codigo,
		Setor: req.body.Setor,
		Data: [],
		Investido: { qntTotal: 0, vlrTotal: 0, precoMedio: 0 }
	});
	acao
		.save()
		.then(result => console.log(result))
		.catch(err => console.log(err));
	res.status(201).json({ message: 'POST Requests das Açoes', acaoCriada: acao });
};

//Busca UMA Açao
exports.buscaAcao = (req, res) => {
	const codigo = req.params.codigo;
	Acao.findOne({ Codigo: codigo })
		.exec()
		.then(doc => {
			console.log(doc);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({ message: 'Açao nao encontrada!' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

//Atualiza Açao (Adicionando)
exports.atualizaAcaoAdicionando = (req, res) => {
	const nome = req.params.nome;
	let acao = {
		data: req.body.data,
		quantidade: req.body.quantidade,
		preco: req.body.preco
	};
	console.log(nome);
	Acao.findOne({ Codigo: nome }, function (err, doc) {
		if (err) {
			console.log(err);
		} else {
			doc.Investido.qntTotal =
				doc.Investido.qntTotal + parseInt(req.body.quantidade);
			doc.Investido.vlrTotal = doc.Investido.vlrTotal + (parseFloat(req.body.preco) * parseInt(req.body.quantidade));
			doc.Investido.precoMedio = doc.Investido.vlrTotal / doc.Investido.qntTotal;

			doc.Data.push(acao);
			doc.save();
			res.status(200).json({ message: 'Açao Atualizada', document: doc });
		}
	}).catch(err => {
		console.log(err);
		res.status(500).json({ message: err });
	});
};

//Atualiza Açao (Deletando)
exports.atualizaAcaoDeletando = (req, res) => {
	console.log('Fazer!');
	res.json(req.params);
	/*
	const codigo = req.params.codigo;
	let acao = {
		data: req.body.data,
		quantidade: req.body.quantidade,
		preco: req.body.preco
	};
	console.log(acao);
	Acao.findOne({ Codigo: codigo }, function(err, doc) {
		if (err) {
			console.log(err);
		} else {
			doc.Investido.qntTotal =
				doc.Investido.qntTotal + parseInt(req.body.quantidade);
			doc.Investido.vlrTotal = doc.Investido.vlrTotal + parseFloat(req.body.preco);
			doc.Investido.precoMedio = doc.Investido.vlrTotal / doc.Investido.qntTotal;

			doc.Data.push(acao);
			doc.save();
			res.status(200).json({ message: 'Açao Atualizada', document: doc });
		}
	}).catch(err => {
		console.log(err);
		res.status(500).json({ message: err });
	});*/
};

//Deleta Açao
exports.deletaAcao = (req, res) => {
	const codigo = req.params.codigo;
	Acao.deleteOne({ Codigo: codigo }, function (err) {
		if (err) {
			return handleError(err);
		} else {
			res.status(200).json({ message: 'Açao Deletada' });
			console.log('Deletou Essa merda');
		}
	}).catch(err => {
		console.log(err);
		res.status(500).json({ message: err });
	});
};
