import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEntryComponent } from './detail-entry.component';

describe('DetailEntryComponent', () => {
  let component: DetailEntryComponent;
  let fixture: ComponentFixture<DetailEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
