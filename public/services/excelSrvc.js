(function () {
    'use strict';

    var app = angular.module('wardApp');

    app.service('excelSrvc', ['$q', excelSrvcFxn]);

    function excelSrvcFxn() {
        return {
            exportToExcel: function (fileName, sheetName, headers, dataList) {
                var deferred = $q.defer();

                try {
                    // 1. Initialize Workbook and Worksheet
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet(sheetName);

                    // 2. Add Headers
                    var headerRow = worksheet.addRow(headers);

                    // Style Headers (Optional)
                    headerRow.eachCell(function (cell) {
                        cell.font = { name: 'Arial', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2F4F4F' } };
                        cell.alignment = { horizontal: 'center' };
                    });

                    // 3. Add Data Rows
                    dataList.forEach(function (item) {
                        worksheet.addRow(item);
                    });

                    // Set column widths automatically
                    worksheet.columns.forEach(function (column) {
                        var maxLen = 0;
                        column.eachCell({ includeEmpty: true }, function (cell) {
                            var valLen = cell.value ? cell.value.toString().length : 0;
                            if (valLen > maxLen) { maxLen = valLen; }
                        });
                        column.width = maxLen < 10 ? 10 : maxLen + 2;
                    });

                    // 4. Generate Buffer and Download File
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        var blob = new Blob([buffer], {
                            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        });

                        // Trigger download via FileSaver
                        saveAs(blob, fileName + '.xlsx');
                        deferred.resolve(true);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });

                } catch (error) {
                    deferred.reject(error);
                }

                return deferred.promise;
            }
        };
    }
})()