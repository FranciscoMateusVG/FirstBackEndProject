const inputController = {
  getInput: () => {
    let nome, codigo, setor, tipo;
    nome = $('#nomeAcao').val();
    codigo = $('#codigoAcao').val();
    setor = $('#setorAcao').val();
    tipo = $('#tipoAcao').val();

    return { Nome: nome, Codigo: codigo, Setor: setor, Tipo: tipo };
  },

  insereNoBD: inputAcao => {
    $.post(
      '/acoes',
      inputAcao,
      function(data, textStatus, jqXHR) {
        console.log(data, textStatus, jqXHR);
      },
      'json'
    );
  },

  clearInput: () => {
    $('.inputAcaoForm')[0].reset();
  },

  updateInputs: (cellValues, arrayTable) => {
    const { value, cell, bgColor } = cellValues;
    let lineInput, columnInput, index, status;

    status = JSON.stringify(bgColor)
      .replace(/"/g, '')
      .replace('{', '')
      .replace('}', '');

    lineInput = cell.slice(1);
    columnInput = cell.slice(0, 1);

    index = arrayTable.findIndex(value => {
      return value.line == lineInput && value.column == columnInput;
    });

    arrayTable[index].title = value;
    arrayTable[index].status = status;
  }
};
export default inputController;
