/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { XlsxService } from './xlsx.service';

describe('XlsxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XlsxService]
    });
  });

  it('should ...', inject([XlsxService], (service: XlsxService) => {
    expect(service).toBeTruthy();
  }));
});
