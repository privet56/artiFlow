import { Injectable } from '@angular/core';
import { Network, DataSet, Node, Edge, IdType } from 'vis';
import * as vis from 'vis';

@Injectable()
export class DataService
{
  constructor()
  {

  }

  public getNetworkData(supplier:boolean) : vis.Data
  {
    let DIR:string = "assets/";
    let nodes:Node[] = [
      {id: 1,  shape: 'circularImage', image: DIR + 'dev3.gif', group:'myGroup', fixed: true, color:"green" },
      {id: 2,  shape: 'circularImage', image: DIR + 'svn2.png', group:'myGroup'},
      {id: 3,  shape: 'circularImage', image: DIR + 'jenkins1.gif', group:'myGroup'},
      {id: 4,  shape: 'circularImage', image: DIR + 'wildfly1.png', group:'myGroup'},
      {id: 5,  shape: 'circularImage', image: DIR + 'browser1.gif', group:'myGroup'},
      {id: 6,  shape: 'circularImage', image: DIR + 'artifactory.png', group:'myGroup'}
    ];
    if(!supplier)
    {
      nodes.push({id: 7,  shape: 'circularImage', image: DIR + 'wildfly1.png', group:'myGroup'});
      nodes.push({id: 8,  shape: 'circularImage', image: DIR + 'browser1.gif', group:'myGroup'});
      nodes.push({id: 9,  shape: 'circularImage', image: DIR + 'wildfly1.png', group:'myGroup'});
      nodes.push({id: 10,  shape: 'circularImage', image: DIR + 'browser1.gif', group:'myGroup'});
    }
    let edges:Edge[] = [
      {from: 1, to: 2},     //dev->svn
      {from: 1, to: 3},     //dev->jenkins
      {from: 3, to: 4},     //jenkins->wildfly
      {from: 4, to: 5},     //wildfly->browser
      {from: 3, to: 6},      //jenkins->arti

      {from: 3, to: 7},     //jenkins->wildfly TEST
      {from: 3, to: 9},     //jenkins->wildfly PROD
      {from: 7, to: 8},     //wildfly->browser TEST
      {from: 9, to: 10}     //wildfly->browser PROD

    ];
    var data:vis.Data = {
      nodes: nodes,
      edges: edges
    };
    
    return data;
  }
}
