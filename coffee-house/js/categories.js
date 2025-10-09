;(async () => {
  const buttons = document.querySelector('.menu__buttons-container')
  const catalog = document.querySelector('.menu__list')
  const loadButton = document.querySelector('.menu__load-button')

  const products = await fetchProducts()
  let currentCategory = 'coffee'
  let isLoaded = false

  let renderProducts = []

  window.addEventListener('resize', () => {
    fillCatalog(currentCategory, false)
  })

  fillCatalog('coffee', true)

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
      fillCatalog(category, true)
      isLoaded = false
    })
  }

  loadButton.addEventListener('click', async () => {
    loadProducts()
    isLoaded = true
  })

  function renderCard(card) {
    const cardHTML = document.createElement('div')
    cardHTML.classList.add('menu__card')

    const image = document.createElement('img')
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

  function fillCatalog(category, first) {
    let categoryProducts = products.filter((product) => product.category === category)
    if (first && window.innerWidth > 768) {
      currentCategory = category
      loadButton.style.display = 'none'

      renderProducts = []
      renderProducts = [...categoryProducts]

      categoryProducts = categoryProducts.map((product) => renderCard(product))

      const oldCards = [...catalog.children]
      oldCards.forEach((card) => card.remove())

      categoryProducts.forEach((category) => catalog.append(category))
    } else if (first && window.innerWidth <= 768) {
      currentCategory = category
      categoryProducts.length > 4 ? (loadButton.style.display = 'flex') : (loadButton.style.display = 'none')

      categoryProducts = categoryProducts.slice(0, 4)
      renderProducts = []
      renderProducts = [...categoryProducts]

      categoryProducts = categoryProducts.map((product) => renderCard(product))

      const oldCards = [...catalog.children]
      oldCards.forEach((card) => card.remove())

      categoryProducts.forEach((category) => catalog.append(category))
    } else if (!first && window.innerWidth <= 768) {
      if (isLoaded) {
        return
      }
      if (renderProducts.length === 4) {
        return
      }
      loadButton.style.display = 'flex'
      renderProducts = renderProducts.slice(0, 4)

      const lessProducts = renderProducts.map((product) => renderCard(product))

      const oldCards = [...catalog.children]
      oldCards.forEach((card) => card.remove())

      lessProducts.forEach((product) => catalog.append(product))
    } else if (!first && window.innerWidth > 768) {
      isLoaded = false
      loadProducts()
    }
  }

  function loadProducts() {
    let additionalProducts = products
      .filter((product) => product.category === currentCategory)
      .filter((product) => !renderProducts.some((renderProduct) => product.name === renderProduct.name))
    if (additionalProducts.length === 0) {
      return
    }
    loadButton.style.display = 'none'
    renderProducts = [...renderProducts, ...additionalProducts]
    additionalProducts = additionalProducts.map((product) => renderCard(product))
    additionalProducts.forEach((category) => catalog.append(category))
  }
})()
