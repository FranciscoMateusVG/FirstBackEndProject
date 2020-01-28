const tableView = {
  renderTableAcoes: data => {
    console.log(data);
    data.forEach((value, index) => {
      index = index + 1;

      tableView.renderNormalInput(value, index);
    });
  },

  renderNormalInput: (value, index) => {
    const { Investido, Tipo, Codigo, Setor } = value;

    let template = `<tr class="${Codigo}" data-toggle="modal" data-target="#compraAcaoModal">
                    <td data-children-count="1" id="A1" class="text-center">${Codigo}</td>
                    <td data-children-count="1" id="B1" class="text-center">${Tipo}</td>
                    <td data-children-count="1" id="C1 class="text-center">${Setor}</td>
                    <td data-children-count="1" id="D1" class="text-right">0%</td>
                    <td data-children-count="1" id="E1" class="text-right">R$ ${Investido.vlrTotal}</td> </tr>`;
    $(`.spreadSheet`).append(template);
  }
};

export default tableView;
