import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEmailListComponent } from './group-email-list.component';

describe('GroupEmailListComponent', () => {
  let component: GroupEmailListComponent;
  let fixture: ComponentFixture<GroupEmailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupEmailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEmailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
