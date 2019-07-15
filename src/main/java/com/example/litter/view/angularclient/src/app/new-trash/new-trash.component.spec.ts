import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTrashComponent } from './new-trash.component';

describe('NewTrashComponent', () => {
  let component: NewTrashComponent;
  let fixture: ComponentFixture<NewTrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTrashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
