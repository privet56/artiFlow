import { Injectable } from '@angular/core';

import { DatePipe } from '../../../node_modules/@angular/common';

//import * as Excel from "exceljs/dist/exceljs.min.js";
//import * as ExcelProper from "exceljs";

//import { Excel } from 'exceljs';
//import * as Excel from 'exceljs'; //https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/exceljs/exceljs-tests.ts
//import { Borders, FillPattern, Font, Workbook, Worksheet } from 'exceljs';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as ExcelProper from "exceljs";
import * as fs from 'file-saver'; //https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/file-saver/file-saver-tests.ts

@Injectable()
export class XlsxService
{
  constructor(private datePipe: DatePipe)
  {

  }
  generateAndDownload() : void
  {
    //example: https://www.ngdevelop.tech/export-to-excel-in-angular-6/

    let workbook: ExcelProper.Workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Flow Data');
    let titleRow = worksheet.addRow(["Flow Data"]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    // Blank Row
    worksheet.addRow([]);

    //TODO: add pic

    //Add row with current date
    let subTitleRow = worksheet.addRow(['Flow Data Export Date : ' + this.datePipe.transform(new Date(), 'medium')]);

    //TODO: add real flow data!

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'flowData.xlsx');
    });
  }
}
