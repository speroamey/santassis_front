import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPrestationsComponent } from './prestations.component';

describe('PrestationsComponent', () => {
  let component: UserPrestationsComponent;
  let fixture: ComponentFixture<UserPrestationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPrestationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPrestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
