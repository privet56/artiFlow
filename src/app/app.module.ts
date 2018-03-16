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

@NgModule({
  declarations: [
    AppComponent,
    FlowHeaderComponent,
    FlowFooterComponent,
    FlowFlowLeftComponent,
    FlowFlowRightComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
