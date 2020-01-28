import Cell from "./public/model/cell.js";
import tableView from "./public/view/tableView.js";
import modalView from "./public/view/modalView.js";
import rowController from "./public/controller/rowController.js";
import saveController from "./public/controller/saveController.js";
import inputController from "./public/controller/inputController.js";
import columnController from "./public/controller/columnController.js";

{
  //Variables
  let inputAcao, getAcoes;

  //Destructuring Objects
  const { getInput, insereNoBD, clearInput } = inputController;
  const { renderTableAcoes } = tableView;
  //Functions
  const start = async () => {
    try {
      getAcoes = await $.get("/acoes", "json");
      renderTableAcoes(getAcoes.acoes);
      $("#tableSpreadSheet").DataTable({
        initComplete: function() {
          this.api()
            .columns()
            .every(function() {
              var column = this;
              var select = $('<select><option value=""></option></select>')
                .appendTo($(column.header()))
                .on("change", function() {
                  var val = $.fn.dataTable.util.escapeRegex($(this).val());

                  column.search(val ? "^" + val + "$" : "", true, false).draw();
                });

              column
                .data()
                .unique()
                .sort()
                .each(function(d, j) {
                  select.append('<option value="' + d + '">' + d + "</option>");
                });
            });
        }
      });
      $(".dataTables_wrapper").removeClass("form-inline");
      $(".col-xs-12").addClass("col-12");
    } catch (err) {
      console.log(err);
    }
  };

  const insereAcao = () => {
    inputAcao = getInput();
    insereNoBD(inputAcao);
    clearInput();
  };

  //START
  start();

  //Event Listners
  /** Inserir Açao */
  $("#createColumn").click(function(e) {
    insereAcao();
  });

  $(".tabelaAcoes").click(function(e) {
    let codAcao = $(e.target)
      .parent()
      .children("#A1")
      .text();

    console.log(codAcao);
  });
}
