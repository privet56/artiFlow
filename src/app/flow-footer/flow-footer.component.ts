import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CfgService } from '../services/cfg.service';
import { Configuration, ConfigurationEntry } from '../model/models';

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
  /*async */loadFooter()
  {

//version 1: es6 + async:
    //this.footer = await this.cfgService.getCFG("footer");

/*version 2: promise:
    this.cfgService.getCFG("footer").then(footer => {
      console.log("RETURNED:"+footer);
      this.footer = footer;
    },
    err => {
      console.log("RETURNED-REJECTED:"+err);
    }).catch(err => {
      console.log("catched:"+err);
    });*/

//version 3: observable:
    this.cfgService.getCFG("footer").subscribe((footer:ConfigurationEntry)=> {
      this.footer = footer.value;
    },
    err => {
      console.log("flow-footer REJECTED:"+err);
    });
  }
}
