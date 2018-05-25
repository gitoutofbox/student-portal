import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLauncherComponent } from './modal-launcher.component';

describe('ModalLauncherComponent', () => {
  let component: ModalLauncherComponent;
  let fixture: ComponentFixture<ModalLauncherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLauncherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
