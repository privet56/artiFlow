import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network, DataSet, Node, Edge, IdType } from 'vis';
import * as vis from 'vis';

@Injectable()
export class CfgService
{
  constructor(protected http:Http)
  {

  }


  //ATTENTION: IE11 & iOS-SAFARI & ANDROID4-BROWSER DO NOT SUPPORT ASYNC-AWAIT
  //ATTENTION: ASYNC-AWAIT NEEDS "target": "es6" SET IN TSCONFIG.JSON
  //TODO: reimplement the old way
  public async getCFG(cfgEntryName:string) : Promise<string>
  {
    try
    {
      const response = await this.http.get("api/config?name="+cfgEntryName).toPromise();
      let data = await response.json();
      return data[cfgEntryName];
    }
    catch(e)
    {
      console.log(e); 
    }
  }

  public getNetworkCfg(supplierNetwork:boolean) : vis.Options
  {
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
        hover: true,
        hoverConnectedEdges: true,
        keyboard: {
          enabled: false,
          speed: {x: 10, y: 10, zoom: 0.02},
          bindToWindow: true
        },
        multiselect: true,
        navigationButtons: true,
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300,
        zoomView: true
      },

//http://visjs.org/docs/network/physics.html#
//http://visjs.org/examples/network/physics/physicsConfiguration.html
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
        enabled: false,                       //if true, edit/add node functions are displayed
        initiallyActive: true,
        addNode: true,
        addEdge: true,
//        editNode: false,
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
    return options;
  }

}
