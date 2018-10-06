import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelectEditComponent } from './player-select-edit.component';

describe('PlayerSelectEditComponent', () => {
  let component: PlayerSelectEditComponent;
  let fixture: ComponentFixture<PlayerSelectEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerSelectEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSelectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
