(function () {
  'use strict';

  const ExcelJS = require('exceljs');

  async function readExcelFile(file) {
    // Create a new workbook instance
    const workbook = new ExcelJS.Workbook();
    let headers = [];
    let jsonData = [{ward: 'medical'}, {ward: 'orthopedics'},
                    {ward: 'surgery'}, {ward: 'peadiatrics'},
                    {ward: 'gynaec'}, {ward: 'gynaecTheater'},
                    {ward: 'lyingIn'}, {ward: 'labour'},
                    {ward: 'NICU'}, {ward: 'ICU'},
                    {ward: 'peadEmergency'}, {ward: 'emergency'},
                    {ward: 'burns'}];
    // let state = {};
    
    // Load the XLSX file
    await workbook.xlsx.readFile(file);
    
    // Get the worksheet by name or by index (e.g., workbook.worksheets[0])
    const worksheet = workbook.getWorksheet('Sheet1'); 

    // const dataRows = worksheet.getSheetValues();
    const dataRows = worksheet.getSheetValues().slice(5).slice(0, -2);
    // console.log(dataRows);
    dataRows.forEach((rowArray, index) => {
      rowArray = rowArray.slice(4);
      // console.log("index:", index, "row:", rowArray);
      if(index == 0){
        let date = rowArray[0];
        for (var i = 0; i < jsonData.length; i++) {
          jsonData[i].date = date;
        }
      }
      let key = (typeof(rowArray[0]) == 'object') ? rowArray[0].richText[0].text : rowArray[0];
      let wardKey = 0;
      for (var i = 1; i < rowArray.length; i++) {
        if(wardKey == jsonData.length){
          break;
        }
        jsonData[wardKey][key] = (typeof(rowArray[i]) == 'object') ? rowArray[i].result : rowArray[i];
        wardKey++;
      }
    });
    // console.log(JSON.stringify(jsonData));
    console.log(jsonData);
    return jsonData;
  }

  exports.readExcelFile = readExcelFile;
// export default readExcelFile;
//   readExcelFile().catch(err => console.error(err));

})()