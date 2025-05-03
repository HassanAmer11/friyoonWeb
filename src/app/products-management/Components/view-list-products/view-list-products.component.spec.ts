import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListProductsComponent } from './view-list-products.component';

describe('ViewListProductsComponent', () => {
  let component: ViewListProductsComponent;
  let fixture: ComponentFixture<ViewListProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewListProductsComponent]
    });
    fixture = TestBed.createComponent(ViewListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
