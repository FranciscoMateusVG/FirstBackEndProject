const columnController = {
  getItens: () => {
    const arr = [];
    $('.itens').each(function() {
      arr.push($(this).val());
    });
    return arr;
  },

  showAddRow: () => $('.addRows').show()
};

export default columnController;
