import { AfterViewInit, ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { Network, DataSet, Node, Edge, IdType } from 'vis';
import { DataService } from '../services/data.service';
import { CfgService } from '../services/cfg.service';
import * as vis from 'vis';


@Component({
  selector: 'app-flow-flow-right',
  templateUrl: './flow-flow-right.component.html',
  styleUrls: ['./flow-flow-right.component.css']
})
export class FlowFlowRightComponent implements OnInit, AfterViewInit
{

  @ViewChild('lph1network') vlph1network :	ElementRef;

  constructor(protected dataService:DataService,
              protected cfgService:CfgService)
  {
    
  }
  ngOnInit()
  {

  }
  ngAfterViewInit()
  {
    let container           = this.vlph1network.nativeElement;
    let options:vis.Options = this.cfgService.getNetworkCfg(false);
    let data:vis.Data       = this.dataService.getNetworkData(false);    
    let network:vis.Network = new vis.Network(container, data, options);
    
    setTimeout(() => {

      //network.startSimulation();
      //network.stabilize(1);

      network.moveNode(1, 90, 0);
      let o:vis.FocusOptions = {};
      o.scale= 1;
      o.offset = {x:9, y:9};
      let a:vis.AnimationOptions = {duration: 1999, easingFunction: 'easeInCubic'};
      o.animation = a;
      network.focus(1, o);
      network.selectNodes([1], true);

    }, 1333);
  }
}
