import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserUsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UserUsersComponent;
  let fixture: ComponentFixture<UserUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
