import { AfterViewInit, ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { Network, DataSet, Node, Edge, IdType } from 'vis';
import { DataService } from '../services/data.service';
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

  constructor(protected dataService:DataService)
  {

  }
  ngOnInit()
  {
  }
//TODO: set options http://visjs.org/docs/network/
//TODO: how to animate animated gif?
  ngAfterViewInit()
  {
    let DIR:string = "assets/";
    let nodes = [
      {id: 1,  shape: 'circularImage', image: DIR + 'dev3.gif', group:'myGroup'},
      {id: 2,  shape: 'circularImage', image: DIR + 'svn2.png', group:'myGroup'},
      {id: 3,  shape: 'circularImage', image: DIR + 'jenkins1.gif', group:'myGroup'},
      {id: 4,  shape: 'circularImage', image: DIR + 'wildfly1.png', group:'myGroup'},
      {id: 5,  shape: 'circularImage', image: DIR + 'browser1.gif', group:'myGroup'},
      {id: 6,  shape: 'circularImage', image: DIR + 'artifactory.png', group:'myGroup'}
    ];
    let edges = [
      {from: 1, to: 2},     //dev->svn
      {from: 1, to: 3},     //dev->jenkins
      {from: 3, to: 4},     //jenkins->wildfly
      {from: 4, to: 5},      //wildfly->browser
      {from: 3, to: 6}      //jenkins->arti
    ];
    let container = this.vlph1network.nativeElement;
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options:vis.Options = {

      autoResize: true,
      height: '100%',
      width: '100%',
      locale: 'en',
      clickToUse: false,


      interaction:{
        dragNodes:true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideNodesOnDrag: false,
        hover: false,
        hoverConnectedEdges: true,
        keyboard: {
          enabled: false,
          speed: {x: 10, y: 10, zoom: 0.02},
          bindToWindow: true
        },
        multiselect: false,
        navigationButtons: false,
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300,
        zoomView: true
      },




      physics:{
        enabled: true,
        barnesHut: {
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 0
        },
        forceAtlas2Based: {
          gravitationalConstant: -50,
          centralGravity: 0.01,
          springConstant: 0.08,
          springLength: 100,
          damping: 0.4,
          avoidOverlap: 0
        },
        repulsion: {
          centralGravity: 0.2,
          springLength: 200,
          springConstant: 0.05,
          nodeDistance: 100,
          damping: 0.09
        },
        hierarchicalRepulsion: {
          centralGravity: 0.0,
          springLength: 100,
          springConstant: 0.01,
          nodeDistance: 120,
          damping: 0.09
        },
        maxVelocity: 50,
        minVelocity: 0.1,
        solver: 'barnesHut',
        stabilization: {
          enabled: true,
          iterations: 1000,
          updateInterval: 100,
          onlyDynamicEdges: false,
          fit: true
        },
        timestep: 0.5,
        adaptiveTimestep: true
      },




      manipulation: {
        enabled: false,
        initiallyActive: true,
        addNode: true,
        addEdge: true,
        editNode: undefined,
        editEdge: true,
        deleteNode: true,
        deleteEdge: true,
        controlNodeStyle:{
          shape:'dot',
          size:6,
          color: {
            background: '#ff0000',
            border: '#3c3c3c',
            highlight: {
              background: '#07f968',
              border: '#3c3c3c'
            }
          },
          borderWidth: 2,
          borderWidthSelected: 2
        }
      },

      layout: {
        randomSeed: undefined,
        improvedLayout:true,
        hierarchical: {
          enabled:false,
          levelSeparation: 150,
          nodeSpacing: 100,
          treeSpacing: 200,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: 'UD',        // UD, DU, LR, RL
          sortMethod: 'hubsize'   // hubsize, directed
        }
      },

      nodes: {
        borderWidth:4,
        size:30,
        color: {
            border: '#222222',
            background: '#666666'
          },
          font:{color:'#eeeeee'}
      },
      groups:{
        useDefaultGroups: true,
        myGroupId:{
          myGroup: {color:{background:'red'}, borderWidth:3}
        }
      },
      edges: {
        arrows: {
          to:     {enabled: false, scaleFactor:1, type:'arrow'},
          middle: {enabled: false, scaleFactor:1, type:'arrow'},
          from:   {enabled: false, scaleFactor:1, type:'arrow'}
        },
        arrowStrikethrough: true,
        color: {
          color:'#848484',
          highlight:'#848484',
          hover: '#848484',
          inherit: 'from',
          opacity:1.0
        },
        dashes: true,
        font: {
          color: '#343434',
          size: 16, // px
          face: 'arial',
          background: 'none',
          strokeWidth: 2, // px
          strokeColor: '#ffffff',
          align: 'horizontal',
        },
        hoverWidth: 1.5,
        label: undefined,
        labelHighlightBold: true,
        length: undefined,

        scaling:{
          min: 1,
          max: 15,
          label: {
            enabled: true,
            min: 14,
            max: 30,
            maxVisible: 30,
            drawThreshold: 5
          },
          customScalingFunction: function (min,max,total,value) {
            if (max === min) {
              return 0.5;
            }
            else {
              var scale = 1 / (max - min);
              return Math.max(0,(value - min)*scale);
            }
          }
        },
        selectionWidth: 1,
        selfReferenceSize:20,
        shadow:{
          enabled: false,
          color: 'rgba(0,0,0,0.5)',
          size:10,
          x:5,
          y:5
        },
        smooth: {
          enabled: true,
          type: "dynamic",
          roundness: 0.5
        },
        title:undefined,
        value: undefined,
        width: 1
      },                      //edges end
      configure: {
        enabled:true,
        showButton:true
      }
    };
    let network:vis.Network = new vis.Network(container, data, options);
    
    setTimeout(() => {
      network.moveNode(1, 9, 0);
      //network.startSimulation();

      let o:vis.FocusOptions = {};
      o.scale= 1;
      o.offset = {x:9, y:9};
      let a:vis.AnimationOptions = {duration: 1999, easingFunction: 'easeInCubic'};
      o.animation = a;
      network.focus(1, o);
      network.selectNodes([1, 6], true);

      //network.stabilize(1);
    }, 1333);
    
  }
}
