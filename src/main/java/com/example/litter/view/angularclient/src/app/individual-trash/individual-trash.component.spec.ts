import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTrashComponent } from './individual-trash.component';

describe('IndividualTrashComponent', () => {
  let component: IndividualTrashComponent;
  let fixture: ComponentFixture<IndividualTrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualTrashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
