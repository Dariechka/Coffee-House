export type EventCallback = (target: string) => void
export type Subscription = { unsubscribe: () => void }

export class EventEmitter {
  private listeners: Map<string, Array<EventCallback>> = new Map<string, Array<EventCallback>>()

  public on(eventType: string, callback: EventCallback, once: boolean = false): Subscription {
    if (!once) {
      return this.on_(eventType, callback)
    }

    const subscription = this.on_(eventType, (target) => {
      subscription.unsubscribe()
      callback(target)
    })
    return subscription
  }

  public emit(eventType: string, target?: string): void {
    if (target !== undefined) {
      ;(this.listeners.get(eventType) || []).forEach((callback) => callback(target))
    } else {
      ;(this.listeners.get(eventType) || []).forEach((callback) => callback(''))
    }
  }

  private on_(eventType: string, callback: EventCallback): Subscription {
    this.listeners.set(eventType, this.listeners.get(eventType) || [])
    this.listeners.get(eventType)?.push(callback)
    return {
      unsubscribe: (): void => {
        const currentListeners = this.listeners.get(eventType) || []
        this.listeners.set(
          eventType,
          currentListeners.filter((callback_) => callback_ !== callback)
        )
      },
    }
  }
}
