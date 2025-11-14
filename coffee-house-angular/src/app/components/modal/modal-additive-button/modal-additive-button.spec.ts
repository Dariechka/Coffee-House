import type { ComponentFixture } from '@angular/core/testing'
import { TestBed } from '@angular/core/testing'

import { ModalAdditiveButton } from './modal-additive-button'

describe('ModalAdditiveButton', () => {
  let component: ModalAdditiveButton
  let fixture: ComponentFixture<ModalAdditiveButton>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAdditiveButton],
    }).compileComponents()

    fixture = TestBed.createComponent(ModalAdditiveButton)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
