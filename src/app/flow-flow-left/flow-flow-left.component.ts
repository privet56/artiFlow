import { AfterViewInit, ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { Network, DataSet, Node, Edge, IdType } from 'vis';
import { DataService } from '../services/data.service';
import { CfgService } from '../services/cfg.service';
import * as vis from 'vis';
//declare var vis: any;   //this is the greenhorn version :-)

@Component({
  selector: 'app-flow-flow-left',
  templateUrl: './flow-flow-left.component.html',
  styleUrls: ['./flow-flow-left.component.css']
})
export class FlowFlowLeftComponent implements OnInit, AfterViewInit
{
  @ViewChild('lph1network') vlph1network :	ElementRef;
  protected network:vis.Network = null;

  constructor(protected dataService:DataService,
              protected cfgService:CfgService)
  {

  }
  ngOnInit()
  {
  }
  //TODO: how to animate animated gif?
  ngAfterViewInit()
  {
    let container           = this.vlph1network.nativeElement;
    let options:vis.Options = this.cfgService.getNetworkCfg(true);
    let data:vis.Data       = this.dataService.getNetworkData(true);    
    this.network            = new vis.Network(container, data, options);

    //container.addEventListener('mouseover', this.onMouseover);
    this.network.on("hoverNode", this.onMouseover);
    this.network.on("showPopup", function(params) {
      this.showPopup(params);
    });
    this.network.on("hidePopup", function(params) {
      this.hidePopup(params);
    });
    
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

    }, 1333);
  }
  public onMouseover(event)
  {
    console.log("onMouseover");
    //var properties =  this.network.getEventProperties(event);
    // properties contains things like node id, group, x, y, time, etc.
    //console.log('mouseover properties:', properties);
  }
  public showPopup(params)
  {
    console.log("showPopup");
  }
  public hidePopup(params)
  {
    console.log("hidePopup");
  }
}
