import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveImagesComponent } from './retrieve-images.component';

describe('RetrieveImagesComponent', () => {
  let component: RetrieveImagesComponent;
  let fixture: ComponentFixture<RetrieveImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrieveImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
