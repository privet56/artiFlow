import { Component, OnInit, Input } from '@angular/core';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-pdfgenerator',
  templateUrl: './pdfgenerator.component.html',
  styleUrls: ['./pdfgenerator.component.css']
})
export class PdfgeneratorComponent implements OnInit
{
  @Input() public ele2pdf:HTMLElement;

  constructor(protected pdfService:PdfService)
  {

  }

  ngOnInit()
  {

  }
  public onpdf(event:MouseEvent) : boolean
  {
    this.pdfService.generate(this.ele2pdf);
    return false;
  }
}
