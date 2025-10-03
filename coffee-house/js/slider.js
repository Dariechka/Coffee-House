;(async () => {
  // state declarations
  const ribbon = document.querySelector('.favorite__slider__ribbon')
  const left = document.querySelector('.left')
  const right = document.querySelector('.right')

  const allDrinks = await fetchCoffee()

  let step = 0
  let size = 'large'
  let skipClick = false

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

  function renderCard(step, place) {
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

  right.addEventListener('click', () => {
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
  })

  left.addEventListener('click', () => {
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
  })
})()
