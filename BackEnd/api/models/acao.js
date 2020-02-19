const mongoose = require('mongoose');

const acoesSchema = mongoose.Schema({
  Nome: String,
  Tipo: String,
  Codigo: String,
  Setor: String,
  Data: [{ data: Date, quantidade: Number, preco: Number, Valor: Number }],
  Investido: { qntTotal: Number, vlrTotal: Number, precoMedio: Number }
});

module.exports = mongoose.model('Acoes', acoesSchema);
