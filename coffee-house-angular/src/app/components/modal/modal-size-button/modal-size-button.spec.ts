import type { ComponentFixture } from '@angular/core/testing'
import { TestBed } from '@angular/core/testing'

import { ModalSizeButton } from './modal-size-button'

describe('ModalSizeButton', () => {
  let component: ModalSizeButton
  let fixture: ComponentFixture<ModalSizeButton>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSizeButton],
    }).compileComponents()

    fixture = TestBed.createComponent(ModalSizeButton)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
