/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CfgService } from './cfg-service.service';

describe('CfgServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CfgServiceService]
    });
  });

  it('should ...', inject([CfgServiceService], (service: CfgServiceService) => {
    expect(service).toBeTruthy();
  }));
});
