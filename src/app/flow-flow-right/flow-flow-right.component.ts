import { AfterViewInit, ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { Network, DataSet, Node, Edge, IdType } from 'vis';
import { DataService } from '../services/data.service';
import { CfgService } from '../services/cfg.service';
import * as vis from 'vis';
declare var $visNetworkAnimator : any;

@Component({
  selector: 'app-flow-flow-right',
  templateUrl: './flow-flow-right.component.html',
  styleUrls: ['./flow-flow-right.component.css']
})
export class FlowFlowRightComponent implements OnInit, AfterViewInit
{
  protected network:vis.Network = null;
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
    this.network            = new vis.Network(container, data, options);
    
    setTimeout(() => {

      //network.startSimulation();
      //network.stabilize(1);

      this.network.moveNode(1, 90, 0);
      let o:vis.FocusOptions = {};
      o.scale= 1;
      o.offset = {x:9, y:9};
      let a:vis.AnimationOptions = {duration: 1999, easingFunction: 'easeInCubic'};
      o.animation = a;
      this.network.focus(1, o);
      this.network.selectNodes([1], true);

      this.onVisAnimateLoaded();

    }, 1333);
  }
  public onVisAnimateLoaded() : void
  {
    $visNetworkAnimator.init(this.network);
    this.ani();
  }
  public ani()
  {
    var that = this;
      this.network["animateTraffic"]([

             {edge:1, trafficSize:5, isBackward: false},
             {edge:2, trafficSize:5, isBackward: false}

         ],null,null,null, function(){ that.ani(); });
  }
}
