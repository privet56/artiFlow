import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CfgService } from '../services/cfg.service';

@Component({
  selector: 'app-flow-footer',
  templateUrl: './flow-footer.component.html',
  styleUrls: ['./flow-footer.component.css']
})
export class FlowFooterComponent implements OnInit, AfterViewInit
{
  footer:string = "2010-* | Corporate Information";

  constructor(protected dataService:DataService,
              protected cfgService:CfgService)
  {

  }

  ngOnInit()
  {

  }
  ngAfterViewInit()
  {
    this.loadFooter();
  }
  async loadFooter()
  {
    this.footer = await this.cfgService.getCFG("footer");
  }  
}
