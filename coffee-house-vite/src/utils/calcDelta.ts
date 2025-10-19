export const largeRibbonWidth: number = 480
export const smallRibbonWidth: number = 348
const borderWindowWidth: number = 768
export const timerDelayValue: number = 600
export const minTouchValue = 50
export const sliderInterval = 3000
export const errorSwipe = 200
export const transitionTime = 100
export const unmountChildTime = 600
export const numberOfCards = 4
export const topOffset = 60

export function calcDelta(): number {
  return window.innerWidth > borderWindowWidth ? largeRibbonWidth : smallRibbonWidth
}

export function isMoreBorderWindowWidth(): boolean {
  return window.innerWidth > borderWindowWidth
}
