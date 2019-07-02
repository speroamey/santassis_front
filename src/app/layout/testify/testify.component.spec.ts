import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestifyComponent } from './testify.component';

describe('TestifysComponent', () => {
  let component: TestifyComponent;
  let fixture: ComponentFixture<TestifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
