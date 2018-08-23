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
      {id: 1,  shape: 'circularImage', label: "Developer" , image: DIR + 'dev3.gif', group:'myGroup', fixed: true, color:"aee0a8" },
      {id: 2,  shape: 'circularImage', label: "SVN Server", image: DIR + 'svn2.png', group:'myGroup'},
      {id: 3,  shape: 'circularImage', label: "Jenkins"   , image: DIR + 'jenkins1.gif', group:'myGroup'},
      {id: 4,  shape: 'circularImage', label: "Wildfly"   , image: DIR + 'wildfly1.png', group:'myGroup'},
      {id: 5,  shape: 'circularImage', label: "Browser"   , image: DIR + 'browser1.gif', group:'myGroup'},
      {id: 6,  shape: 'circularImage', label: "Artifactory",image: DIR + 'artifactory.png', group:'myGroup'}
    ];
    if(!supplier/*customer*/)
    {
      nodes.push({id: 7,  shape: 'circularImage', label: "Wildfly", image: DIR + 'wildfly1.png', group:'myGroup'});
      nodes.push({id: 8,  shape: 'circularImage', label: "Browser", image: DIR + 'browser1.gif', group:'myGroup'});
      nodes.push({id: 9,  shape: 'circularImage', label: "Wildfly", image: DIR + 'wildfly1.png', group:'myGroup'});
      nodes.push({id: 10,  shape: 'circularImage', label: "Browser", image: DIR + 'browser1.gif', group:'myGroup'});
    }
    let edges:Edge[] = [
      {id:1, from: 1, to: 2},     //dev->svn
      {id:2, from: 1, to: 3},     //dev->jenkins
      {id:3, from: 3, to: 4},     //jenkins->wildfly
      {id:4, from: 4, to: 5},     //wildfly->browser
      {id:5, from: 3, to: 6},      //jenkins->arti

      {id:6, from: 3, to: 7},     //jenkins->wildfly TEST
      {id:7, from: 3, to: 9},     //jenkins->wildfly PROD
      {id:8, from: 7, to: 8},     //wildfly->browser TEST
      {id:9, from: 9, to: 10}     //wildfly->browser PROD

    ];
    var data:vis.Data = {
      nodes: nodes,
      edges: edges
    };
    
    return data;
  }
}
