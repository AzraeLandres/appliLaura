import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSortMenuComponent } from './filter-sort-menu.component';

describe('FilterSortMenuComponent', () => {
  let component: FilterSortMenuComponent;
  let fixture: ComponentFixture<FilterSortMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterSortMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterSortMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
