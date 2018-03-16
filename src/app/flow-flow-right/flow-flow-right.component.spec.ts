/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlowFlowRightComponent } from './flow-flow-right.component';

describe('FlowFlowRightComponent', () => {
  let component: FlowFlowRightComponent;
  let fixture: ComponentFixture<FlowFlowRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowFlowRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowFlowRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
