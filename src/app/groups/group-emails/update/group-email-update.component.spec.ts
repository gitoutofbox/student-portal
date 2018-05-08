import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEmailUpdateComponent } from './group-email-update.component';

describe('GroupEmailUpdateComponent', () => {
  let component: GroupEmailUpdateComponent;
  let fixture: ComponentFixture<GroupEmailUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupEmailUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEmailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
