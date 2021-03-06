const columnDefs = [
  { field: "make" },
  { field: "model" },
  { field: "price" },
  { field: "mph" },
  { field: "hp" },
  { field: "duration" },
];

const actionColumnDefs = [
  { field: "checkbox" },
  { field: "dropdown" },
  { field: "toggle",
  cellRenderer: function(params){
    return '<div class="dropdown action-dropdown">' + 
              '<button class="dropdown-toggle" type="button" data-toggle="dropdown" style="padding: 0px 5px; border: 0px; background: none; color: rgb(136, 136, 136);"></button>' +
            '</div>';
}
  },
  { field: "buttons",
    cellRenderer: function(params){
        return '<div class="button btn fixed-button btn-action">' + 
                  '<div class="btn-wrapper">' +
                    '<div class="btn-text-wrapper">' +
                      'button' + 
                    '</div>' +
                  '</div>' +
                '</div>';
    }
  },
];





// specify the data
const rowData = [
  { make: "Toyota", model: "Celica", price: 35000, mph: 5, hp: 300, duration: 60 },
  { make: "Ford", model: "Mondeo", price: 32000, mph: 5, hp: 300, duration: 60  },
  { make: "Porsche", model: "Boxter", price: 72000, mph: 5, hp: 300, duration: 60  },
  { make: "Toyota", model: "Celica", price: 35000, mph: 5, hp: 300, duration: 60  },
  { make: "Porsche", model: "Boxter", price: 72000, mph: 5, hp: 300, duration: 60  },
  { make: "Ford", model: "Mondeo", price: 32000, mph: 5, hp: 300, duration: 60  },
  { make: "Porsche", model: "Boxter", price: 72000, mph: 5, hp: 300, duration: 60  },
  { make: "Ford", model: "Mondeo", price: 32000, mph: 5, hp: 300, duration: 60  },
  { make: "Toyota", model: "Celica", price: 35000, mph: 5, hp: 300, duration: 60  },
  { make: "Porsche", model: "Boxter", price: 72000, mph: 5, hp: 300, duration: 60  },
];

// specify the data
const columnActionRowData = [
  { checkbox: "Toyota", dropdown: "Celica", toggle: 35000, buttons: 5 },
];

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData
};

const columnActionGridOptions = {
  columnDefs: actionColumnDefs,
  rowData: columnActionRowData,
  rowHeight: 70,
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    const columnsActionGrid = document.querySelector('#columns-action-button');
    new agGrid.Grid(columnsActionGrid, columnActionGridOptions);
});