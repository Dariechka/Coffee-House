;(async () => {
  const buttons = document.querySelector('.menu__buttons-container')
  const catalog = document.querySelector('.menu__list')

  const products = await fetchProducts()

  addEventListener('resize', renderFirst)
  renderFirst()

  async function fetchProducts() {
    const response = await fetch('./products.json')
    return await response.json()
  }

  for (let button of buttons.children) {
    button.addEventListener('click', () => {
      for (let button2 of buttons.children) {
        button2.classList.remove('active-button')
      }
      button.classList.add('active-button')

      const category = button.textContent
        .trim()
        .split('')
        .map((letter, index) => (index === 0 ? letter.toLowerCase() : letter))
        .join('')
      fillCatalog(category)
    })
  }

  function renderFirst() {
    fillCatalog('coffee')
  }

  function renderCard(card) {
    const cardHTML = document.createElement('div')
    cardHTML.classList.add('menu__card')

    const image = document.createElement('img')
    //image.alt = card.category;
    image.classList.add('menu__card__img')
    image.style.backgroundImage = `url("${card.src}")`

    const textWrapper = document.createElement('div')
    textWrapper.classList.add('menu__card__text')

    const textInnerWrapper = document.createElement('div')
    textInnerWrapper.classList.add('menu__card__text_text')
    const h4 = document.createElement('h4')
    h4.textContent = card.name
    h4.classList.add('menu__card__text_large')
    const p = document.createElement('p')
    p.textContent = card.description
    p.classList.add('menu__card__text_small')
    textInnerWrapper.append(h4)
    textInnerWrapper.append(p)

    const pOuter = document.createElement('p')
    pOuter.textContent = '$' + `${card.price}`
    pOuter.classList.add('menu__card__text_large')

    textWrapper.append(textInnerWrapper)
    textWrapper.append(pOuter)

    cardHTML.prepend(image)
    cardHTML.append(textWrapper)

    return cardHTML
  }

  function fillCatalog(category) {
    const categoryProducts = products
      .filter((product) => product.category === category)
      .map((product) => renderCard(product))
    const oldCards = [...catalog.children]
    oldCards.forEach((card) => card.remove())
    categoryProducts.forEach((category) => catalog.append(category))
  }
})()
