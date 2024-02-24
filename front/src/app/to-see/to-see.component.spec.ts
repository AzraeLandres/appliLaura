import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSeeComponent } from './to-see.component';

describe('ToSeeComponent', () => {
  let component: ToSeeComponent;
  let fixture: ComponentFixture<ToSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToSeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
