import { Component, OnInit } from '@angular/core';
import { XlsxService }  from "../services/xlsx.service";

@Component({
  selector: 'app-flow-header',
  templateUrl: './flow-header.component.html',
  styleUrls: ['./flow-header.component.css']
})
export class FlowHeaderComponent implements OnInit
{
  constructor(protected xlsxService:XlsxService) { }

  ngOnInit()
  {

  }
  public onXlsx(e:Event) : boolean
  {
    e.preventDefault();
    this.xlsxService.generateAndDownload();
    return false;
  }
}
