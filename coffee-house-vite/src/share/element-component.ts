import type { EventCallback, Subscription } from './even-emitter'
import { EventEmitter } from './even-emitter'
import type { AttributesType, ElementParameters, EventListener } from '../typing/types.ts'

export const eventEmitter: EventEmitter = new EventEmitter()

export class ElementComponent<E extends Element> {
  protected readonly element: E

  private subscriptions: Array<Subscription> = []
  private children: Array<ElementComponent<Element>> = []

  constructor(element: E, { classes, text, attributes, listeners, children }: ElementParameters) {
    this.element = element

    element.classList.add(...(classes || []))
    if (text) {
      element.textContent = text
    }
    if (attributes) {
      attributes.forEach((attribute: AttributesType) => this.element.setAttribute(attribute.name, attribute.value))
    }
    if (listeners) {
      listeners.forEach((listener: EventListener) => this.element.addEventListener(listener.type, listener.value))
    }
    if (children) {
      children.forEach((child) => child.mountToParent(this))
    }
  }

  public mountToParent(parent: ElementComponent<Element>): void {
    if (parent) {
      parent.mountChildren(this)
    }
  }

  public mountChildren(...children: Array<ElementComponent<Element>>): void {
    for (const child of children) {
      this.children.push(child)
      this.element.appendChild(child.element)
    }
  }

  public unmount(): void {
    this.children.forEach((child): void => child.unmount())
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.element.remove()
  }

  public on(eventType: string, callback: EventCallback, once: boolean = false): void {
    const subscription: Subscription = eventEmitter.on(eventType, callback, once)
    this.subscriptions.push(subscription)
  }

  public emit(eventType: string, target?: string): void {
    eventEmitter.emit(eventType, target)
  }
}
