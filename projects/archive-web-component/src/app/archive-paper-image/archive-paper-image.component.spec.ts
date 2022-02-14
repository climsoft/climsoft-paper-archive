import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePaperImageComponent } from './archive-paper-image.component';

describe('ArchivePaperImageComponent', () => {
  let component: ArchivePaperImageComponent;
  let fixture: ComponentFixture<ArchivePaperImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivePaperImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivePaperImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
