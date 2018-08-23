import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FlowHeaderComponent } from './flow-header/flow-header.component';
import { FlowFooterComponent } from './flow-footer/flow-footer.component';
import { FlowFlowLeftComponent } from './flow-flow-left/flow-flow-left.component';
import { FlowFlowRightComponent } from './flow-flow-right/flow-flow-right.component';

import { DataService } from './services/data.service';
import { CfgService } from './services/cfg.service';
import { PdfService } from './services/pdf.service';
import { XlsxService } from './services/xlsx.service';
import { PdfgeneratorComponent } from './controls/pdfgenerator/pdfgenerator.component';

import { DatePipe } from '../../node_modules/@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FlowHeaderComponent,
    FlowFooterComponent,
    FlowFlowLeftComponent,
    FlowFlowRightComponent,
    PdfgeneratorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService, CfgService, PdfService, XlsxService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
