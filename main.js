const columnDefs = [
  { field: "Image" },
  { field: "Status" },
  { field: "SKU" },
  { field: "ASIN" },
  { field: "Review Ratings" },
  { field: "Product Title" },
  { field: "Available" },
  { field: "Price" },
  { field: "Date A" },
  { field: "Date B" },
  { field: "Group" },
  { field: "Product Manager" },
];

const imageColumnDefs = [
  { 
    field: "Image",
    width: 100,
    cellRenderer: params => {
      const cell = document.createElement('div');
      cell.className = "cell-product-image";
      
      const cellWapper = document.createElement('div');
      cellWapper.className = "cell-wrapper";

      const cellContent = document.createElement('div');
      cellContent.className = "cell-content";

      const visualInfo = document.createElement('div');
      visualInfo.className = "visual-info product-image";

      cellContent.appendChild(visualInfo);
      cellWapper.appendChild(cellContent);
      cell.appendChild(cellWapper);

      const image = document.createElement('img');
      image.className = "img-fluid";
      const icon = document.createElement('i');
      icon.className = "far fa-images";

      if(params.value && params.value.length) {
          image.setAttribute("src", params.value);
          visualInfo.appendChild(image);
      } else {
          visualInfo.appendChild(icon);
      }
      
      return cell;
    },
  },
];

const dateColumnDefs = [
  { 
    field: "Date",
    width: 100,
    cellRenderer: params => {
      const cell = document.createElement('div');
      cell.className = "cell-date-updated";

      const cellWrapper = document.createElement('div');
      cellWrapper.className = "cell-wrapper";
      cell.appendChild(cellWrapper);

      const cellContent = document.createElement('div');
      cellContent.className = "cell-content";
      cellWrapper.appendChild(cellContent);

      const textContent = document.createElement('div');
      textContent.className = "text-content row";
      cellContent.appendChild(textContent);

      const date_created = document.createElement('span');
      date_created.className = "cell-text-main col";

      const date_statusChanged = document.createElement('span');
      date_statusChanged.className = "cell-text-sub-alt col";

      const appendZero = num => {
          if(num !== 0 && !num) {
              return "00";
          }

          const str = num.toString();
          if(str.length < 2) {
              return "0" + str;
          } else {
              return str;
          }
      }

      const date_created_date = params.value && new Date(params.value) ? new Date(params.value) : null;
      const date_statusChanged_date = params.data.statusChangedDate && new Date(params.data.statusChangedDate) ? new Date(params.data.statusChangedDate) : null;

      date_created.innerText = date_created_date ? date_created_date.toLocaleDateString() : "-"; // + " " + appendZero(date_created_date.getHours()) + ":" + appendZero(date_created_date.getMilliseconds()) : '-';
      date_statusChanged.innerText = date_statusChanged_date ? date_statusChanged_date.toLocaleDateString() : "-"; // + " " + appendZero(date_statusChanged_date.getHours()) + ":" + appendZero(date_statusChanged_date.getMilliseconds()) : '-';


      if(date_created.innerText == "Invalid date"|| date_created.innerText == "Invalid Date")
          date_created.innerText = "-"

      textContent.appendChild(date_created);
      // textContent.appendChild(date_statusChanged);

      return cell;
    }
  },
];

const actionColumnDefs = [
  { 
    headerName: "Inbound",
    field: "SKU",
    width: 100,
    width: 130,
    cellStyle: params => {
      return {color: '#0C71BC'};
    },
    cellRenderer: params => {
      const cell = document.createElement('div');
      cell.className = "cell-sku";

      const cellLinkWrapper = document.createElement('a');
      cellLinkWrapper.className = "cell-link-wrapper";

      cell.appendChild(cellLinkWrapper);

      const cellContent = document.createElement('div');
      cellContent.className = "cell-content";

      cellLinkWrapper.appendChild(cellContent);

      const textContent = document.createElement('div');
      textContent.className = "text-content";

      cellContent.appendChild(textContent);

      const span = document.createElement('span');
      // sku.className = "cell-text-main sku";

      span.innerText = params.value ? params.value : "";
      textContent.appendChild(span);


      const cellAction = document.createElement('div');
      cellAction.className = "call-to-action cell-action-view-detail";

      textContent.appendChild(cellAction);

      cell.setAttribute("href", "#");
      cell.addEventListener("click", e => {
          e.preventDefault();
          setSelectedProduct(params.data);

          if(!document.querySelectorAll(".main-detail-wrapper.open").length) {
              setIsDetailOpen(true);
          } else {
              setTriggerUpdateDetail(true);
          }
      })

      const icon = document.createElement('i');
      icon.className = "far fa-arrow-right";

      cellAction.appendChild(icon);
      return cell;
  }
  },
  {
    headerName: 'Outbound',
    field: 'ASIN',
    width: 130,
    cellStyle: params => {
      return {color: '#0C71BC'};
    },
    cellRenderer: params => {
      const cell = document.createElement('div');
      cell.className = "cell-asin";

      const cellLinkWrapper = document.createElement('a');
      cellLinkWrapper.className = "cell-link-wrapper";
      cell.appendChild(cellLinkWrapper);
      
      const cellContent = document.createElement('div');
      cellContent.className = "cell-content";
      cellLinkWrapper.appendChild(cellContent);

      const textContent = document.createElement('div');
      textContent.className = "text-content";
      cellContent.appendChild(textContent);

      const span = document.createElement('span');
      const asin = document.createElement('a');

      const cellAction = document.createElement('a');
      cellAction.className = "call-to-action cell-action-external-link";

      const channelStrArr = params.data ? params.data.channelStore ? params.data.channelStore.split(' ') : ["US"] : ["US"];
      const country = channelStrArr[channelStrArr.length - 1].toUpperCase();
      const ean = document.createElement('span');
      // ean.className = "cell-text-sub-alt";
      ean.style.color = "rgb(153, 153, 153)";
      ean.style.fontWeight = "700";

      asin.innerText = params.value && params.value.length ? params.value : '-';
      ean.innerText = params.data.ean && params.data.ean.length ? params.data.ean : '-';

      asin.style.fontWeight = "700";

      textContent.appendChild(asin);


      textContent.appendChild(cellAction);

      const icon = document.createElement('i');
      icon.className = "far fa-external-link";
      cellAction.appendChild(icon);
      
      cellContent.appendChild(ean);
      // cell.appendChild(ean);

      if(country && params.value) {
          switch(country) {
              case 'US':
                  cellLinkWrapper.setAttribute("href", "https://www.amazon.com/dp/" + params.value);
                  break;
              case 'CA':
                  cellLinkWrapper.setAttribute("href", "https://www.amazon.ca/dp/" + params.value);
                  break;
              case 'MX':
                  cellLinkWrapper.setAttribute("href", "https://www.amazon.com.mx/dp/" + params.value);
                  break;
              case 'UK':
                  cellLinkWrapper.setAttribute("href", "https://www.amazon.co.uk/dp/" + params.value);
                  break;
              case 'DE':
                  cellLinkWrapper.setAttribute("href", "https://www.amazon.de/dp/" + params.value);
                  break;
              case 'FR':
                  cellLinkWrapper.setAttribute("href", "https://www.amazon.fr/dp/" + params.value);
                  break;
              case 'IT':
                  cellLinkWrapper.setAttribute("href", "https://www.amazon.it/dp/" + params.value);
                  break;
              case 'ES':
                  cellLinkWrapper.setAttribute("href", "https://www.amazon.es/dp/" + params.value);
                  break;
              case 'NL':
                  cellLinkWrapper.setAttribute("href", "https://www.amazon.nl/dp/" + params.value);
                  break;
              case 'IN':
                  cellLinkWrapper.setAttribute("href", "https://www.amazon.in/dp/" + params.value);
                  break;
              case 'JP':
                  cellLinkWrapper.setAttribute("href", "https://www.amazon.co.jp/dp/" + params.value);
                  break;
              default:
                  cellLinkWrapper.setAttribute("href", "https://www.amazon.com/dp/" + params.value);
                  break;
          }
          cellLinkWrapper.setAttribute("target", "_blank");
      } else {
          cellLinkWrapper.setAttribute("href", "#");
          cellLinkWrapper.addEventListener("click", e => {
              e.preventDefault();
          })
      }

      return cell;
    }
  },
  {
    headerName: "Button",
    field: "Status",
    width: 200,
    cellRenderer: function (params) {
        const cellMain = document.createElement('div');
        const cellWrapper = document.createElement('div');
        const cellContent = document.createElement('div');
        cellMain.className = "cell-download";
        cellWrapper.className = "cell-wrapper";
        cellContent.className = "cell-content";

        const cell = document.createElement('div');
        cell.className = params.value === "Completed" || params.value === "Cancelled" ? "button fixed-button btn-action download" : "button fixed-button btn-action creating"
        if(params.value && params.value === "Completed") {
            cell.setAttribute("href", params.data.link);
            cell.setAttribute("target", "_blank");
        }

        cellMain.appendChild(cellWrapper);
        cellWrapper.appendChild(cellContent);
        cellContent.appendChild(cell);

        const btnWrapper = document.createElement('div');

        const btnTextWrapper = document.createElement('div');
        const text = document.createElement('p');

        btnWrapper.className = "btn-wrapper";
        btnWrapper.style.backgroundColor = "#fff";
        btnWrapper.style.borderRadius = "4px";
        btnWrapper.style.overflow = "hidden";
        btnTextWrapper.className = "btn-text-wrapper";
        text.innerText = params.value;

        btnTextWrapper.appendChild(text);
        btnWrapper.appendChild(btnTextWrapper);
        cell.appendChild(btnWrapper);

        return cellMain;
    },
  },
  {
    headerName: "Copy",
    field: "caseId",
    width: 200,
    cellRenderer: (params) => {
      const cell = document.createElement('div');
      cell.className = "cell-copy";
      const mainLink = document.createElement('span');

      const copyBtn = document.createElement('button');
      copyBtn.setAttribute("type", "button");
      copyBtn.innerHTML = '<i class="fal fa-paste"></i>';

      params.value = params.value

      mainLink.innerText = params.value;
      copyBtn.addEventListener("click", e => {
          e.preventDefault();
          const textarea = document.createElement('textarea');
          textarea.style.width = "0";
          textarea.style.height = "0";
          textarea.innerText = params.value;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          textarea.remove();

          const target = e.target;
          target.className = "active";
          target.innerHTML = '<i class="fal fa-check"></i>';
          setTimeout(() => {
              target.className = "";
              target.innerHTML = '<i class="fal fa-paste"></i>';
          }, 2000);
      })
      cell.appendChild(mainLink);
      cell.appendChild(copyBtn);
      return cell;
  },
  }
];

// Main Grid Data
const rowData = [
  { Image: "https://m.media-amazon.com/images/I/411P7XAI2xL._SS160_.jpg", Status: "Active", SKU: "AAAA00000", ASIN: "B000000000", "Review Ratings": 5, "Product Title": "Spigen ArcStation Pro USB C Charger, 45W GaN Type C PD 3.0 Super Fast Charger Foldable Wall Adapter for Galaxy S21 Ultra Plus S20 Note 20 10 iPad MacBook Air (Cable Included/USB-C PD PPS Charging)", Available: 999, Price: 99.9, "Date A": "1/1/2021", "Date B": "12/31/2021", Group: "Not Assigned", "Product Manager": "+", ean: "880123456789"},
  { Image: "https://m.media-amazon.com/images/I/51IcFHWQsJL._SS160_.jpg", Status: "Active", SKU: "AAAA00000", ASIN: "B000000000", "Review Ratings": 4, "Product Title": "Spigen ArcStation Pro USB C Charger, 45W GaN Type C PD 3.0 Super Fast Charger Foldable Wall Adapter for Galaxy S21 Ultra Plus S20 Note 20 10 iPad MacBook Air (Cable Included/USB-C PD PPS Charging)", Available: 900, Price: 99.9, "Date A": "1/1/2021", "Date B": "12/31/2021", Group: "Not Assigned", "Product Manager": "+", ean: "880123456789"},
  { Image: "https://m.media-amazon.com/images/I/41BJLq5c9HL._SS160_.jpg", Status: "Active", SKU: "AAAA00000", ASIN: "B000000000", "Review Ratings": 3, "Product Title": "Spigen ArcStation Pro USB C Charger, 45W GaN Type C PD 3.0 Super Fast Charger Foldable Wall Adapter for Galaxy S21 Ultra Plus S20 Note 20 10 iPad MacBook Air (Cable Included/USB-C PD PPS Charging)", Available: 700, Price: 99.9, "Date A": "1/1/2021", "Date B": "12/31/2021", Group: "Not Assigned", "Product Manager": "+", ean: "880123456789"},
  { Image: "https://m.media-amazon.com/images/I/415upqO3eML._SS160_.jpg", Status: "Inactive", SKU: "AAAA00000", ASIN: "B000000000", "Review Ratings": 2, "Product Title": "Spigen ArcStation Pro USB C Charger, 45W GaN Type C PD 3.0 Super Fast Charger Foldable Wall Adapter for Galaxy S21 Ultra Plus S20 Note 20 10 iPad MacBook Air (Cable Included/USB-C PD PPS Charging)", Available: 500, Price: 99.9, "Date A": "1/1/2021", "Date B": "12/31/2021", Group: "Not Assigned", "Product Manager": "+"},
  { Image: "https://m.media-amazon.com/images/I/41i061JihcL._SS160_.jpg", Status: "Inactive", SKU: "AAAA00000", ASIN: "B000000000", "Review Ratings": 1, "Product Title": "Spigen ArcStation Pro USB C Charger, 45W GaN Type C PD 3.0 Super Fast Charger Foldable Wall Adapter for Galaxy S21 Ultra Plus S20 Note 20 10 iPad MacBook Air (Cable Included/USB-C PD PPS Charging)", Available: 100, Price: 99.9, "Date A": "1/1/2021", "Date B": "12/31/2021", Group: "Not Assigned", "Product Manager": "+"},
  { Image: "https://m.media-amazon.com/images/I/41SoBFDTPzL._SS160_.jpg", Status: "Inactive", SKU: "AAAA00000", ASIN: "B000000000", "Review Ratings": 0, "Product Title": "Spigen ArcStation Pro USB C Charger, 45W GaN Type C PD 3.0 Super Fast Charger Foldable Wall Adapter for Galaxy S21 Ultra Plus S20 Note 20 10 iPad MacBook Air (Cable Included/USB-C PD PPS Charging)", Available: 0, Price: 99.9, "Date A": "1/1/2021", "Date B": "12/31/2021", Group: "Not Assigned", "Product Manager": "+"},
];

// Image Grid Data
const columnImageRowData = [
  { Image: "https://m.media-amazon.com/images/I/41SoBFDTPzL._SS160_.jpg" },
];

// Date Grid Data
const columnDateRowData = [
  { Date: "01/01/2021" },
];

// Action Grid Data
const columnActionRowData = [
  { SKU: "ACS012345", ASIN: "B091G96CB9", ean: "880123456789", Status: "Completed", caseId: "1234567890" },
  { SKU: "ACS012345", ASIN: "B091G96CB9", ean: "880123456789", Status: "Cancelled", caseId: "1234567890" },
  { SKU: "ACS012345", ASIN: "B091G96CB9", ean: "880123456789", Status: "Progress", caseId: "1234567890" },
];

const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  rowHeight: 90,
  columnDefs: [
    {
      headerName: 'Image',
      field: 'Image',
      pinned: 'left',
      width: 100,
      cellRenderer: params => {
        const cell = document.createElement('div');
        cell.className = "cell-product-image";
        
        const cellWapper = document.createElement('div');
        cellWapper.className = "cell-wrapper";

        const cellContent = document.createElement('div');
        cellContent.className = "cell-content";

        const visualInfo = document.createElement('div');
        visualInfo.className = "visual-info product-image";

        cellContent.appendChild(visualInfo);
        cellWapper.appendChild(cellContent);
        cell.appendChild(cellWapper);

        const image = document.createElement('img');
        image.className = "img-fluid";
        const icon = document.createElement('i');
        icon.className = "far fa-images";

        if(params.value && params.value.length) {
            image.setAttribute("src", params.value);
            visualInfo.appendChild(image);
        } else {
            visualInfo.appendChild(icon);
        }
        
        return cell;
    },
    },
    {
      headerName: 'Status',
      field: 'Status',
      pinned: 'left',
      width: 110,
      cellRenderer: params => {
        if(!params.value) {
            return null;
        }
        
        const status_string = params.value ? params.value.toLowerCase() : "";
        const string_array = status_string.split(' ');
        
        const cell = document.createElement('div');
        cell.className = "cell-listing-status";

        const cellWrapper = document.createElement('div');
        cellWrapper.className = "cell-link-wrapper";

        cell.appendChild(cellWrapper);

        const cellContent = document.createElement('div');
        cellContent.className = "cell-content";

        cellWrapper.appendChild(cellContent);

        const textContent = document.createElement('div');
        textContent.className = "text-content";

        cellContent.appendChild(textContent);

        const icon = document.createElement('i');

        const iconChevronDown = document.createElement('i');
        iconChevronDown.className = "far fa-chevron-down";

        const status = document.createElement('span');
        status.innerText = params.value ? params.value.split('(')[0] : "";

        const text = document.createElement('p');
        text.className = "small";

        cellContent.appendChild(text);

        const cellActionDropdown = document.createElement('div');
        cellActionDropdown.className = "call-to-action cell-action-dropdown";

        cellActionDropdown.appendChild(iconChevronDown);

        if(!status_string.length) {
            return null;
        }
        
        switch(params.value) {
            case "Active":
                icon.className = "fas fa-check-circle";
                textContent.className = "text-content status-active";
                textContent.appendChild(icon);
                textContent.appendChild(status);
                break;
            case "Inactive": 
                icon.className = "fas fa-exclamation-circle";
                textContent.className = "text-content status-inactive";
                textContent.appendChild(icon);
                textContent.appendChild(status);
                // textContent.appendChild(cellActionDropdown);
                break;
            default:
                icon.className = "fas fa-exclamation-circle";
                textContent.className = "text-content status-inactive";
                textContent.appendChild(icon);
                textContent.appendChild(status);
                // textContent.appendChild(cellActionDropdown);
                break;
        }

        return cell;
      },
    },
    {
        headerName: 'SKU',
        field: 'SKU',
        width: 130,
        cellStyle: params => {
          return {color: '#0C71BC'};
        },
        cellRenderer: params => {
          const cell = document.createElement('div');
          cell.className = "cell-sku";

          const cellLinkWrapper = document.createElement('a');
          cellLinkWrapper.className = "cell-link-wrapper";

          cell.appendChild(cellLinkWrapper);

          const cellContent = document.createElement('div');
          cellContent.className = "cell-content";

          cellLinkWrapper.appendChild(cellContent);

          const textContent = document.createElement('div');
          textContent.className = "text-content";

          cellContent.appendChild(textContent);

          const span = document.createElement('span');
          // sku.className = "cell-text-main sku";

          span.innerText = params.value ? params.value : "";
          textContent.appendChild(span);


          const cellAction = document.createElement('div');
          cellAction.className = "call-to-action cell-action-view-detail";

          textContent.appendChild(cellAction);

          cell.setAttribute("href", "#");
          cell.addEventListener("click", e => {
              e.preventDefault();
              setSelectedProduct(params.data);

              if(!document.querySelectorAll(".main-detail-wrapper.open").length) {
                  setIsDetailOpen(true);
              } else {
                  setTriggerUpdateDetail(true);
              }
          })

          const icon = document.createElement('i');
          icon.className = "far fa-arrow-right";

          cellAction.appendChild(icon);
          return cell;
      }
    },
    {
      headerName: 'ASIN',
      field: 'ASIN',
      width: 130,
      cellStyle: params => {
        return {color: '#0C71BC'};
      },
      cellRenderer: params => {
        const cell = document.createElement('div');
        cell.className = "cell-asin";

        const cellLinkWrapper = document.createElement('a');
        cellLinkWrapper.className = "cell-link-wrapper";
        cell.appendChild(cellLinkWrapper);
        
        const cellContent = document.createElement('div');
        cellContent.className = "cell-content";
        cellLinkWrapper.appendChild(cellContent);

        const textContent = document.createElement('div');
        textContent.className = "text-content";
        cellContent.appendChild(textContent);

        const span = document.createElement('span');
        const asin = document.createElement('a');

        const cellAction = document.createElement('a');
        cellAction.className = "call-to-action cell-action-external-link";

        const channelStrArr = params.data ? params.data.channelStore ? params.data.channelStore.split(' ') : ["US"] : ["US"];
        const country = channelStrArr[channelStrArr.length - 1].toUpperCase();
        const ean = document.createElement('span');
        // ean.className = "cell-text-sub-alt";
        ean.style.color = "rgb(153, 153, 153)";
        ean.style.fontWeight = "700";

        asin.innerText = params.value && params.value.length ? params.value : '-';
        ean.innerText = params.data.ean && params.data.ean.length ? params.data.ean : '-';

        asin.style.fontWeight = "700";

        textContent.appendChild(asin);


        textContent.appendChild(cellAction);

        const icon = document.createElement('i');
        icon.className = "far fa-external-link";
        cellAction.appendChild(icon);
        
        cellContent.appendChild(ean);
        // cell.appendChild(ean);

        if(country && params.value) {
            switch(country) {
                case 'US':
                    cellLinkWrapper.setAttribute("href", "https://www.amazon.com/dp/" + params.value);
                    break;
                case 'CA':
                    cellLinkWrapper.setAttribute("href", "https://www.amazon.ca/dp/" + params.value);
                    break;
                case 'MX':
                    cellLinkWrapper.setAttribute("href", "https://www.amazon.com.mx/dp/" + params.value);
                    break;
                case 'UK':
                    cellLinkWrapper.setAttribute("href", "https://www.amazon.co.uk/dp/" + params.value);
                    break;
                case 'DE':
                    cellLinkWrapper.setAttribute("href", "https://www.amazon.de/dp/" + params.value);
                    break;
                case 'FR':
                    cellLinkWrapper.setAttribute("href", "https://www.amazon.fr/dp/" + params.value);
                    break;
                case 'IT':
                    cellLinkWrapper.setAttribute("href", "https://www.amazon.it/dp/" + params.value);
                    break;
                case 'ES':
                    cellLinkWrapper.setAttribute("href", "https://www.amazon.es/dp/" + params.value);
                    break;
                case 'NL':
                    cellLinkWrapper.setAttribute("href", "https://www.amazon.nl/dp/" + params.value);
                    break;
                case 'IN':
                    cellLinkWrapper.setAttribute("href", "https://www.amazon.in/dp/" + params.value);
                    break;
                case 'JP':
                    cellLinkWrapper.setAttribute("href", "https://www.amazon.co.jp/dp/" + params.value);
                    break;
                default:
                    cellLinkWrapper.setAttribute("href", "https://www.amazon.com/dp/" + params.value);
                    break;
            }
            cellLinkWrapper.setAttribute("target", "_blank");
        } else {
            cellLinkWrapper.setAttribute("href", "#");
            cellLinkWrapper.addEventListener("click", e => {
                e.preventDefault();
            })
        }

        return cell;
      }
    },
    {
      headerName: 'Review Ratings',
      field: 'Review Ratings',
      width: 100,
      headerComponentParams: {
        template:
            '<div class="ag-cell-label-container" role="presentation">' +
            '   <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
            '   <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
            '       <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
            '       <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
            '       <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
            '       <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
            '       <span class="listing__custom-header-cell">' +
            '           <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
            '           ' +
            '       </span>' +
            '       <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
            '   </div>' +
            '</div>',
      },
    },
    {
      headerName: 'Product Title',
      field: 'Product Title',
      cellRenderer: params => {
        const cell = document.createElement('div');
        cell.className = "cell-product-title";

        const cellWrapper = document.createElement('div');
        cellWrapper.className = "cell-wrapper";
        cell.appendChild(cellWrapper);

        const cellContent = document.createElement('div');
        cellContent.className = "cell-content";
        cellWrapper.appendChild(cellContent);

        const textContent = document.createElement('div');
        textContent.className = "text-content";
        cellContent.appendChild(textContent);

        const moduleLineClamp = document.createElement('span');
        moduleLineClamp.className = "module line-clamp";
        textContent.appendChild(moduleLineClamp);

        moduleLineClamp.innerText = params.value ? params.value : "";
        moduleLineClamp.style.fontWeight = "600";
        textContent.appendChild(moduleLineClamp);

        return cell;
      },
    },
    {
      headerName: 'Available',
      field: 'Available',
      width: 110,
      cellStyle: {
        justifyContent: "flex-end",
        color: "#0C71BC"
      },
    },
    {
      headerName: 'Price',
      field: 'Price',
      width: 100,
      cellRenderer: params => {
        const cell = document.createElement('div');
        cell.className = "cell-price";

        const cellWrapper = document.createElement('div');
        cellWrapper.className = "cell-wrapper";
        cell.appendChild(cellWrapper);

        const cellContent = document.createElement('div');
        cellContent.className = "cell-content";
        cell.appendChild(cellContent);

        const textContent = document.createElement('div');
        textContent.className = "text-content";
        cell.appendChild(textContent);

        const price = document.createElement('span');
        const currency = document.createElement('span');
        currency.className = "currency";

        price.innerText = "$" + (params.value ? parseFloat(params.value).toFixed(2) + " USD" : 0.00) + "";
        textContent.appendChild(price);

        return cell;
      }
    },
    {
      headerName: 'Date A',
      field: 'Date A',
      width: 110,
      cellRenderer: params => {
        const cell = document.createElement('div');
        cell.className = "cell-date-updated";

        const cellWrapper = document.createElement('div');
        cellWrapper.className = "cell-wrapper";
        cell.appendChild(cellWrapper);

        const cellContent = document.createElement('div');
        cellContent.className = "cell-content";
        cellWrapper.appendChild(cellContent);

        const textContent = document.createElement('div');
        textContent.className = "text-content row";
        cellContent.appendChild(textContent);

        const date_created = document.createElement('span');
        date_created.className = "cell-text-main col";

        const date_statusChanged = document.createElement('span');
        date_statusChanged.className = "cell-text-sub-alt col";

        const appendZero = num => {
            if(num !== 0 && !num) {
                return "00";
            }

            const str = num.toString();
            if(str.length < 2) {
                return "0" + str;
            } else {
                return str;
            }
        }

        const date_created_date = params.value && new Date(params.value) ? new Date(params.value) : null;
        const date_statusChanged_date = params.data.statusChangedDate && new Date(params.data.statusChangedDate) ? new Date(params.data.statusChangedDate) : null;

        date_created.innerText = date_created_date ? date_created_date.toLocaleDateString() : "-"; // + " " + appendZero(date_created_date.getHours()) + ":" + appendZero(date_created_date.getMilliseconds()) : '-';
        date_statusChanged.innerText = date_statusChanged_date ? date_statusChanged_date.toLocaleDateString() : "-"; // + " " + appendZero(date_statusChanged_date.getHours()) + ":" + appendZero(date_statusChanged_date.getMilliseconds()) : '-';


        if(date_created.innerText == "Invalid date"|| date_created.innerText == "Invalid Date")
            date_created.innerText = "-"

        textContent.appendChild(date_created);
        // textContent.appendChild(date_statusChanged);

        return cell;
      }
    },
    {
      headerName: 'Date B',
      field: 'Date B',
      width: 110,
      cellRenderer: params => {
        const cell = document.createElement('div');
        cell.className = "cell-date-updated";

        const cellWrapper = document.createElement('div');
        cellWrapper.className = "cell-wrapper";
        cell.appendChild(cellWrapper);

        const cellContent = document.createElement('div');
        cellContent.className = "cell-content";
        cellWrapper.appendChild(cellContent);

        const textContent = document.createElement('div');
        textContent.className = "text-content row";
        cellContent.appendChild(textContent);

        const date_created = document.createElement('span');
        date_created.className = "cell-text-main col";

        const date_statusChanged = document.createElement('span');
        date_statusChanged.className = "cell-text-sub-alt col";

        const appendZero = num => {
            if(num !== 0 && !num) {
                return "00";
            }

            const str = num.toString();
            if(str.length < 2) {
                return "0" + str;
            } else {
                return str;
            }
        }

        const date_created_date = params.value && new Date(params.value) ? new Date(params.value) : null;
        const date_statusChanged_date = params.data.statusChangedDate && new Date(params.data.statusChangedDate) ? new Date(params.data.statusChangedDate) : null;

        date_created.innerText = date_created_date ? date_created_date.toLocaleDateString() : "-"; // + " " + appendZero(date_created_date.getHours()) + ":" + appendZero(date_created_date.getMilliseconds()) : '-';
        date_statusChanged.innerText = date_statusChanged_date ? date_statusChanged_date.toLocaleDateString() : "-"; // + " " + appendZero(date_statusChanged_date.getHours()) + ":" + appendZero(date_statusChanged_date.getMilliseconds()) : '-';


        if(date_created.innerText == "Invalid date"|| date_created.innerText == "Invalid Date")
            date_created.innerText = "-"

        textContent.appendChild(date_created);
        // textContent.appendChild(date_statusChanged);

        return cell;
      }
    },
    {
      headerName: 'Group',
      field: 'Group',
    },
    {
      headerName: 'Product Manager',
      field: 'Product Manager',
    },
],
};

const columnImageGridOptions = {
  columnDefs: imageColumnDefs,
  rowData: columnImageRowData,
  rowHeight: 100,
};

const columnDateGridOptions = {
  columnDefs: dateColumnDefs,
  rowData: columnDateRowData,
  rowHeight: 100,
};

const columnActionGridOptions = {
  columnDefs: actionColumnDefs,
  rowData: columnActionRowData,
  rowHeight: 100,
};


// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#mainGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    const columnsImageGrid = document.querySelector('#imageGrid');
    new agGrid.Grid(columnsImageGrid, columnImageGridOptions);

    
    const columnsDateGrid = document.querySelector('#dateGrid');
    new agGrid.Grid(columnsDateGrid, columnDateGridOptions);
        
    const columnsActionGrid = document.querySelector('#actionGrid');
    new agGrid.Grid(columnsActionGrid, columnActionGridOptions);
});