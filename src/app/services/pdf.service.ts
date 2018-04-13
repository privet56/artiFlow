import { Injectable } from '@angular/core';
let jsPDF = require('jspdf');
import * as html2canvas from 'html2canvas';

@Injectable()
export class PdfService
{
	protected a4:Array<number> = [842*1.3 , 595*1.3]; 	// landscape!
	protected a3:Array<number> = [1191*1.3, 842*1.3];	  // landscape & A3!
	protected paper2use:Array<number> = this.a3;				// & format: 'a4' | format: 'a3'

  constructor()
  {

  }

  //TODO: return a Promise!
  public generate(ele2pdf:HTMLElement, fn:string="network.pdf") : void
  {

    let me = this;
    html2canvas(ele2pdf)
      .then((canvas) => {
        //TODO: check if setTimeout(function()  is needed
        //me.onpdfrendered(canvas, fn);
        PdfService.onpdfrendered(canvas, fn, me);

      })
      .catch(err => {
        alert("error canvas:"+ err);
      });
  }
  /*public canvas2pdf(canvas:HTMLCanvasElement) : void
  {
    //canvas = this.rewidth(canvas, this.paper2use[0] - 40);

  }*/
	protected static onpdfrendered(canvas:HTMLCanvasElement, fn:string, me:PdfService)
	{
		console.log('onpdf-step.2 canvas.width:'+canvas.width);
		//setTimeout for allowing the browser to repaint
		setTimeout(function() 
		{
      console.log('onpdf-step.3');
      console.log('onpdf-step.3 a:'+me);
			canvas = me.rewidth(canvas, me.paper2use[0] - 40, me.paper2use[1] - 40);
			//canvas.width = paper2use[0];
			//img.width = paper2use[0];
			//console.log('onpdf-step.4('+paper2use[0]+'):'+img.length);
			//var win = window.open('', 'pdfpic');
			//win.document.write('<img src="'+img+'">');
			//return;
			//TODO: make paper2use & resize & split img
			var doc = new jsPDF(
			{
				orientation: 'l',
				unit: 'pt',
				format: 'a3'
			});
			var hmax = me.paper2use[1] - 40;
			if(canvas.height > hmax)
			{
				var imgs:Array<CanvasRenderingContext2D> = me.splitImg(canvas, hmax);
				for(var i=0;i<imgs.length;i++)
				{
					if(i > 0)doc.addPage();
					var w = Math.min(me.paper2use[0] - 40, imgs[i].canvas.width);
					var h = Math.min(me.paper2use[1] - 40, imgs[i].canvas.height);
					doc.addImage(imgs[i].canvas.toDataURL("image/png", 1.0), 'PNG', 20, 20);//, w, h);
				}
			}
			else
			{
				var img = canvas.toDataURL("image/png", 1.0);		//image/jpeg -> black background
				var w = Math.min(me.paper2use[0] - 40, canvas.width);
				var h = Math.min(me.paper2use[1] - 40, canvas.height);
				doc.addImage(img, 'PNG', 20, 20);//, w, h);
			}
			doc.save(fn);
			//$("html, body").css("cursor", "default");
		}, 1);
	};
	protected splitImg(canvas:HTMLCanvasElement, pageHeight:number) : Array<CanvasRenderingContext2D>
  {
    var imgs = new Array();
    var imgHeight = canvas.height;
    var imgStart = 0;

    var dx = 0;
    var dy = 0;
    var dWidth = Math.min(canvas.width, this.paper2use[0]);
    var sx = 0;
    var sWidth = canvas.width;

    while(true)
    {
        var dHeight = pageHeight;
        var sy = imgStart;
        var sHeight = pageHeight;
        dHeight = sHeight;

        var c2 		= document.createElement('canvas');
        c2.height 	= dHeight;
        c2.width 	= dWidth;
        var slice 	= c2.getContext('2d');

        slice.drawImage(canvas, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        imgs.push(slice);

        //console.log("sx:"+sx+" sy:"+sy+" sWidth:"+sWidth+" sHeight:"+sHeight+" dx:"+dx+" dy:"+dy+" dWidth:"+dWidth+" dHeight:"+dHeight);

        /*if(imgs.length == 1)
        {
          var img = c2.toDataURL("image/png");		//image/jpeg -> black background
          var win = window.open('', 'pdfpic');
          win.document.write('<img src="'+img+'">');
        }*/

        imgStart = sy + sHeight;

        if(imgStart >= canvas.height)
        {
            break;
        }
        if(imgs.length > 9)
        {
            console.log("ERR: TOO BIG PDF? ");
            break;
        }
    }
    return imgs;
	}
	protected rewidth(canvas:HTMLCanvasElement, maxWidth:number, maxHeight:number)
	{
    var width = canvas.width;
    var height = canvas.height;
		if( width <= maxWidth)
		{
      //return canvas;
		}

		var c 		= document.createElement('canvas');
    var wScale  = maxWidth / width;
    var hScale  = maxHeight / height;
    var scale = hScale < wScale ? hScale : wScale;
    if(hScale < wScale)
    {
      c.width 	= canvas.width * hScale;
      c.height 	= maxHeight;
    }
    else
    {
      c.height 	= canvas.height * wScale;
      c.width 	= maxWidth;
    }
		var cc 		= c.getContext('2d');
		cc.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, c.width, c.height);

		//console.log("hScale:"+wScale+" wScale:"+wScale+" (scale:"+scale+")-> "+canvas.height+" * "+wScale+" = "+c.height);
		//var win = window.open('', 'pdfpic');
		//win.document.write('<img src="'+c.toDataURL("image/png", 1.0)+'">');

		return c;
	}
}
