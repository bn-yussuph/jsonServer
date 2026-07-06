(function () {
  'use strict';

//   const ExcelJS = require('exceljs');

  async function readExcelFile(file) {
    // Create a new workbook instance
    const workbook = new ExcelJS.Workbook();
    let headers = [];
    let jsonData = [{ward: 'medical', date: ''}, {ward: 'orthopedics', date: ''},
                    {ward: 'surgery', date: ''}, {ward: 'peadiatrics', date: ''},
                    {ward: 'gynaec', date: ''}, {ward: 'gynaecTheater', date: ''},
                    {ward: 'lyingIn', date: ''}, {ward: 'labour', date: ''},
                    {ward: 'NICU', date: ''}, {ward: 'ICU', date: ''},
                    {ward: 'peadEmergency', date: ''}, {ward: 'emergency', date: ''},
                    {ward: 'burns', date: ''}];
    
    // Load the XLSX file
    await workbook.xlsx.readFile(file);
    
    const worksheet = workbook.getWorksheet('Sheet1'); 

    const dataRows = worksheet.getSheetValues().slice(5).slice(0, -2);
    dataRows.forEach((rowArray, index) => {
      rowArray = rowArray.slice(4);
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
    console.log(jsonData);
    return jsonData;

    
  }

})()