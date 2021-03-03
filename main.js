const columnDefs = [
  { field: "make" },
  { field: "model" },
  { field: "price" },
  { field: "mph" },
  { field: "hp" },
  { field: "duration" },
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

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});