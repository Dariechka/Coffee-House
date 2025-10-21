import type { EventCallback, Subscription } from './even-emitter'
import { EventEmitter } from './even-emitter'
import type { AttributesType, ElementParameters, EventListener, Listener } from '../typing/types.ts'

export const eventEmitter: EventEmitter = new EventEmitter()

export class ElementComponent<E extends Element> {
  protected readonly element: E

  protected subscriptions: Array<Subscription> = []
  protected children: Array<ElementComponent<Element>> = []

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

  public addClassToChildren(name: string): void {
    this.children.forEach((child) => child.element.classList.add(name))
  }

  public removeClassFromChildren(name: string): void {
    this.children.forEach((child) => child.element.classList.remove(name))
  }

  public disable(): void {
    this.element.setAttribute('disabled', '')
  }

  public handleEvent<K extends keyof ElementEventMap>(type: string, listener: Listener<K>): void {
    this.element.addEventListener(type, listener)
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

  public unmountChildren(): void {
    this.children.forEach((child) => child.unmount())
  }

  public prependChildren(...children: Array<ElementComponent<Element>>): void {
    for (const child of children) {
      this.children.unshift(child)
      this.element.prepend(child.element)
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
