import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCommandsComponent } from './commands.component';

describe('CommandsComponent', () => {
  let component: UserCommandsComponent;
  let fixture: ComponentFixture<UserCommandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCommandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
