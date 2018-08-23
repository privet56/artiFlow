import { Component, OnInit } from '@angular/core';
import { XlsxService }  from "../services/xlsx.service";

import { DataService } from '../services/data.service';
import { CfgService } from '../services/cfg.service';

import * as vis from 'vis';

@Component({
  selector: 'app-flow-header',
  templateUrl: './flow-header.component.html',
  styleUrls: ['./flow-header.component.css']
})
export class FlowHeaderComponent implements OnInit
{
  constructor(protected xlsxService:XlsxService,
              protected dataService:DataService,
              protected cfgService:CfgService)
  {

  }

  ngOnInit()
  {

  }
  public onXlsx(e:Event) : boolean
  {
    e.preventDefault();
    let data:vis.Data  = this.dataService.getNetworkData(true);
    this.xlsxService.generateAndDownload(data);
    return false;
  }
}
