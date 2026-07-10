import ExcelJS from 'exceljs';
import wardsSrvc from '../services/wardsSrvc.js';

class TransformExcel {

    async readExcelFile(file) {
        // Create a new workbook instance
        const workbook = new ExcelJS.Workbook();
        let headers = [];
        let jsonData = [{ name: 'Medical' }, { name: 'Orthopedics' },
        { name: 'General Surgery' }, { name: 'Peadiatrics' },
        { name: 'Gynaec' }, { name: 'GynaecTheater' },
        { name: 'Lying-in' }, { name: 'Labour' },
        { name: 'NICU' }, { name: 'ICU' },
        { name: 'PeadEmergency' }, { name: 'Emergency' },
        { name: 'Burns' }];
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
            if (index == 0) {
                let date = rowArray[0];
                for (var i = 0; i < jsonData.length; i++) {
                    jsonData[i].date = date;
                }
            }
            let key = (typeof (rowArray[0]) == 'object') ? rowArray[0].richText[0].text : rowArray[0];
            let wardKey = 0;
            for (var i = 1; i < rowArray.length; i++) {
                if (wardKey == jsonData.length) {
                    break;
                }
                jsonData[wardKey][key] = (typeof (rowArray[i]) == 'object') ? rowArray[i].result : rowArray[i];
                wardKey++;
            }
        });
        // console.log(JSON.stringify(jsonData));
        // console.log(jsonData);
        return jsonData;
    }

    transformKeys(data) {
        const keyMapping = {
            'name': 'name',
            'date': 'date',
            'Remained': 'previous',
            'Admission': 'admissions',
            'Discharges': 'discharges',
            'Trans in': 'transins',
            'Trans out': 'transouts',
            'Referrals': 'referred',
            'critically ill': 'criticallyIll',
            'Death': 'deaths',
            'Remained at midnight': 'remaining',
            'No. of males': 'males',
            'No. of females': 'females',
            'Theatre cases': 'theatre',
            'Staff on admission': 'staffOnAdmission',
            'Staff on duty': 'staffOnDuty',
            'Student nurses': 'students',
            'Absconded': 'absconded',
        };

        return data.map(item => {
            const transformedItem = {};
            for (const [key, value] of Object.entries(item)) {
                // transformedItem[keyMapping[key] || key] = value;
                // console.log("key: ", keyMapping[key]);
                const keyM = keyMapping[key];
                if (keyM) {
                    transformedItem[keyM] = value;
                }
            }
            // console.log("Transformed Item: ", transformedItem);
            return transformedItem;
        });
    }

    async addWardIds(data) {
        return await wardsSrvc.getWards()
            .then((res) => {
                const states = [];
                const state = data.map(item => {
                // return data.map((item) => {
                    // console.log("Response: ", res);
                    // console.log("Item: ", item);
                    for(let i = 0; i < res.length; i++){
                        if(res[i].name === item.name){
                           item["wardId"] = res[i].id;
                        }
                    }
                    // console.log("States with Ward IDs: ", item);
                    states.push(item);
                    // return item;
                })
                // console.log("States1 with Ward IDs: ", states);
                return states;
            })
            .catch(err => console.log(err));
        // for (let index = 0; index < data.length; index++) {
        //     const element = data[index];
        //     for (const ward of wards) {
        //         if(ward.name === element.ward){
        //             element[wardId] = ward.id;
        //         }   
        //     }
        // }
        // return data.map(item => {
        //     const states = {};
        //     for (const [key, value] of Object.entries(item)) {
        //         states[key] = value
        //         for (let  i = 0; i < wards.length; i++) {
        //             if (wards[i].name === value) {
        //                 let newKey = "wardId";
        //                 states[newKey] = wards[i].id;
        //             }
        //         }
        //     }
        //     return states;
        // });
    }
}

const transformExcel = new TransformExcel();
export default transformExcel;