import { AfterViewInit, ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { Network, DataSet, Node, Edge, IdType } from 'vis';
import { DataService } from '../services/data.service';
import { CfgService } from '../services/cfg.service';
import * as vis from 'vis';
declare var $visNetworkAnimator : any;
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
    var that = this;
    this.network.on("hoverNode", function(event){that.onMouseover(event, true);});
    this.network.on("blurNode", function(event){that.onMouseover(event, false);});
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

      { /*
        var head = document.getElementsByTagName('head').item(0);
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', 'assets/vis.animateTraffic.js');
        let that = this;
        script.onload = function() {
          that.onVisAnimateLoaded();
        };
        head.appendChild(script);*/
        this.onVisAnimateLoaded();
      }

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

         /*
         var that = this;
         let currentRadius = 3;

         this.network.on("beforeDrawing", function(ctx) {
          //if (animateRadius) {
            var inode;
            var nodePosition = that.network.getPositions();

            let nodes = that.network["body"].nodes;
            
            var arrayLength = nodes.length;

            for (inode = 0; inode < arrayLength; inode++) {

              alert(1);
              var colorCircle = 'rgba(0, 255, 0, 0.8)';
              var colorBorder = 'rgba(0, 255, 0, 0.2)';
              ctx.strokeStyle = colorCircle;
              ctx.fillStyle = colorBorder;
              var radius = Math.abs(50 * Math.sin(currentRadius + inode / 50.0));
              ctx.circle(nodePosition[nodes[inode].id].x, nodePosition[nodes[inode].id].y, radius);
              ctx.fill();
              ctx.stroke();
            }
          });*/
  }
  public onMouseover(event:any, over:boolean)
  {
    console.log("onMouseover:('"+over+"')");
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
