import type { ComponentFixture } from '@angular/core/testing'
import { TestBed } from '@angular/core/testing'

import { ProductRow } from './product-row'

describe('ProductRow', () => {
  let component: ProductRow
  let fixture: ComponentFixture<ProductRow>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRow],
    }).compileComponents()

    fixture = TestBed.createComponent(ProductRow)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
