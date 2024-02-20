    // --==== QUERY EXAMPLES ====--
    // --==== USE LETTERS FOR COLUMN NAMES ====--
    //  'SELECT A,C,D WHERE D > 150'
    //  'SELECT * WHERE B = "Potato"'
    //  'SELECT * WHERE A contains "Jo"'
    //  'SELECT * WHERE C = "active" AND B contains "Jo"'
    //  "SELECT * WHERE E > date '2022-07-9' ORDER BY E DESC"
    // sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
    // sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
const getSheetData = ({ sheetID, sheetName, query, callback }) => {
    const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    const url = `${base}&sheet=${encodeURIComponent(
      sheetName
    )}&tq=${encodeURIComponent(query)}`;
    fetch(url)
      //.then((res) => res.text())
      .then((res) =>{
        if(res.ok){
          //save in storage
          //setItemStorage('sheetID', sheetID);
          //setItemStorage('sheetName', sheetName);
          //console.log('Saved in storage: ',sheetID, sheetName);
          return res.text()
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "ID inválido 🥹"
          })
          return res.text().then(text => {console.log(new Error(text))})
        }
      })
      .then((response) => {
        callback(responseToObjects(response));
      });
  
    function responseToObjects(res) {
      // credit to Laurence Svekis https://www.udemy.com/course/sheet-data-ajax/
      const jsData = JSON.parse(res.substring(47).slice(0, -2));
      let data = [];
      const columns = jsData.table.cols;
      const rows = jsData.table.rows;
      let rowObject;
      let cellData;
      let propName;
      for (let r = 0, rowMax = rows.length; r < rowMax; r++) {
        rowObject = {};
        for (let c = 0, colMax = columns.length; c < colMax; c++) {
          cellData = rows[r]["c"][c];
          propName = columns[c].label.toLowerCase();
          if (cellData === null) {
            rowObject[propName] = "";
          } else if (
            typeof cellData["v"] == "string" &&
            cellData["v"].startsWith("Date")
          ) {
            rowObject[propName] = new Date(cellData["f"]);
          } else {
            rowObject[propName] = cellData["v"];
          }
        }
        data.push(rowObject);
      }
      return data;
    }
  };