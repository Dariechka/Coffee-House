;(async () => {
  // state declarations
  const ribbon = document.querySelector('.favorite__slider__ribbon')
  const left = document.querySelector('.left')
  const right = document.querySelector('.right')
  const progressBar = document.querySelector('.favorite__pointers')
  const slider = document.querySelector('.favorite__slider')

  const allDrinks = await fetchCoffee()

  let step = 0
  let size = 'large'
  progressBar.children[step].style.backgroundPosition = 'left'
  let touchStartX = 0
  let touchEndX = 0
  let interval

  // function declarations
  async function fetchCoffee() {
    const response = await fetch('./coffee.json')
    return await response.json()
  }

  window.addEventListener('resize', () => {
    size = calcDelta() === 480 ? 'large' : 'small'
  })

  function calcDelta() {
    return window.innerWidth > 768 ? 480 : 348
  }

  interval = setInterval(() => {
    leftSliderScroll()
  }, 5000)

  // events handling
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX
  })
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
  })

  ribbon.addEventListener('touchstart', () => {
    clearInterval(interval)
  })
  ribbon.addEventListener('touchcancel', () => {
    interval = setInterval(leftSliderScroll, 5000)
  })

  ribbon.addEventListener('pointerover', () => {
    clearInterval(interval)
  })
  ribbon.addEventListener('pointerout', () => {
    interval = setInterval(leftSliderScroll, 5000)
  })

  right.addEventListener('pointerover', () => {
    clearInterval(interval)
  })
  right.addEventListener('pointerout', () => {
    interval = setInterval(leftSliderScroll, 5000)
  })

  left.addEventListener('pointerover', () => {
    clearInterval(interval)
  })
  left.addEventListener('pointerout', () => {
    interval = setInterval(leftSliderScroll, 5000)
  })

  right.addEventListener('click', () => rightSliderScroll())
  left.addEventListener('click', () => leftSliderScroll())

  function renderCard(step, place) {
    for (const child of progressBar.children) {
      child.style.backgroundPosition = 'right'
    }
    const drink = allDrinks.find((drink, index) => index === step)
    const cardHtml = `<div class="favorite__slider__card">
                <div class="favorite__slider__card__image">
                  <img src="assets/images/${step}-${size}.png" alt="coffee" class="favorite__slider__card__image_img" />
                </div>
                <h4 class="favorite__slider__card__title">${drink.title}</h4>
                <p class="favorite__slider__card__text">${drink.text}</p>
                <h4 class="favorite__slider__card__title">${drink.price}</h4>
            </div>`
    ribbon.insertAdjacentHTML(place, cardHtml)

    progressBar.children[step].style.backgroundPosition = 'left'
  }

  function scroll(translation, immediate = false) {
    for (const card of ribbon.children) {
      if (immediate) {
        card.classList.remove('ribbon_scroll')
      } else {
        card.classList.add('ribbon_scroll')
      }
      card.style.transform = `translateX(${translation}px)`
    }
  }

  function leftSliderScroll() {
    const cardToRemove = ribbon.firstElementChild
    if (step === 0) {
      step = allDrinks.length - 1
    } else {
      step -= 1
    }
    renderCard(step, 'beforeend')
    const translation = calcDelta()

    setTimeout(() => {
      scroll(-translation)
    }, 100)
    setTimeout(() => {
      cardToRemove.remove()
      scroll(0, true)
    }, 600)
  }

  function rightSliderScroll() {
    const cardToRemove = ribbon.firstElementChild
    if (step === allDrinks.length - 1) {
      step = 0
    } else {
      step += 1
    }
    renderCard(step, 'afterbegin')
    const translation = calcDelta()
    scroll(-translation, true)

    setTimeout(() => {
      scroll(0)
    }, 100)
    setTimeout(() => {
      cardToRemove.remove()
    }, 600)
  }

  function handleSwipe() {
    if (calcDelta() === 480) {
      return
    }
    const diff = touchStartX - touchEndX
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left
        leftSliderScroll()
      } else {
        // Swiped right
        rightSliderScroll()
      }
    }
  }
})()
