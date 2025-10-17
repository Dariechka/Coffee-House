export const largeRibbonWidth: number = 480
export const smallRibbonWidth: number = 348
const borderWindowWidth: number = 768
export const timerDelayValue: number = 900

export function calcDelta(): number {
  return window.innerWidth > borderWindowWidth ? largeRibbonWidth : smallRibbonWidth
}
