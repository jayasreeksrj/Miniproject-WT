import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedItemsComponent } from './shipped-items.component';

describe('ShippedItemsComponent', () => {
  let component: ShippedItemsComponent;
  let fixture: ComponentFixture<ShippedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippedItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
