import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickingRouteComponent } from './picking-route.component';

describe('PickingRouteComponent', () => {
  let component: PickingRouteComponent;
  let fixture: ComponentFixture<PickingRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickingRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickingRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
