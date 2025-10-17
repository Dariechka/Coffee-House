import openModal from './modal.js'

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

    cardHTML.addEventListener('click', (event) => {
      openModal(card)
      event.stopPropagation()
    })

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


// {
//   "id": 1,
//   "name": "Irish coffee",
//   "description": "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
//   "price": "7.00",
//   "discountPrice": "6.75",
//   "category": "coffee"
// },
// {
//   "id": 2,
//   "name": "Kahlua coffee",
//   "description": "Classic coffee with milk and Kahlua liqueur under a cap of frothed milk",
//   "price": "7.00",
//   "discountPrice": "6.75",
//   "category": "coffee"
// },
// {
//   "id": 3,
//   "name": "Honey raf",
//   "description": "Espresso with frothed milk, cream and aromatic honey",
//   "price": "5.50",
//   "discountPrice": "5.25",
//   "category": "coffee"
// },
// {
//   "id": 4,
//   "name": "Ice cappuccino",
//   "description": "Cappuccino with soft thick foam in summer version with ice",
//   "price": "5.00",
//   "discountPrice": "4.75",
//   "category": "coffee"
// },
// {
//   "id": 5,
//   "name": "Espresso",
//   "description": "Classic black coffee",
//   "price": "4.50",
//   "discountPrice": "4.25",
//   "category": "coffee"
// },
// {
//   "id": 6,
//   "name": "Latte",
//   "description": "Espresso coffee with the addition of steamed milk and dense milk foam",
//   "price": "5.50",
//   "discountPrice": "5.25",
//   "category": "coffee"
// },
// {
//   "id": 7,
//   "name": "Latte macchiato",
//   "description": "Espresso with frothed milk and chocolate",
//   "price": "5.50",
//   "discountPrice": "5.25",
//   "category": "coffee"
// },
// {
//   "id": 8,
//   "name": "Coffee with cognac",
//   "description": "Fragrant black coffee with cognac and whipped cream",
//   "price": "6.50",
//   "discountPrice": "6.25",
//   "category": "coffee"
// },
// {
//   "id": 9,
//   "name": "Moroccan",
//   "description": "Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint",
//   "price": "4.50",
//   "discountPrice": "4.25",
//   "category": "tea"
// },
// {
//   "id": 10,
//   "name": "Ginger",
//   "description": "Original black tea with fresh ginger, lemon and honey",
//   "price": "5.00",
//   "discountPrice": null,
//   "category": "tea"
// },
// {
//   "id": 11,
//   "name": "Cranberry",
//   "description": "Invigorating black tea with cranberry and honey",
//   "price": "5.00",
//   "discountPrice": null,
//   "category": "tea"
// },
// {
//   "id": 12,
//   "name": "Sea buckthorn",
//   "description": "Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon",
//   "price": "5.50",
//   "discountPrice": null,
//   "category": "tea"
// },
// {
//   "id": 13,
//   "name": "English Breakfast",
//   "description": "Classic strong black tea blend",
//   "price": "4.00",
//   "discountPrice": "3.75",
//   "category": "tea"
// },
// {
//   "id": 14,
//   "name": "Green Jasmine",
//   "description": "Green tea with jasmine flowers",
//   "price": "4.50",
//   "discountPrice": "4.25",
//   "category": "tea"
// },
// {
//   "id": 15,
//   "name": "Mint",
//   "description": "Refreshing herbal tea with mint leaves",
//   "price": "4.00",
//   "discountPrice": "3.75",
//   "category": "tea"
// },
// {
//   "id": 16,
//   "name": "Chamomile",
//   "description": "Soothing chamomile herbal tea",
//   "price": "4.00",
//   "discountPrice": "3.75",
//   "category": "tea"
// },
// {
//   "id": 17,
//   "name": "Marble cheesecake",
//   "description": "Philadelphia cheese with lemon zest on a light sponge cake and red currant jam",
//   "price": "3.50",
//   "discountPrice": "3.25",
//   "category": "dessert"
// },
// {
//   "id": 18,
//   "name": "Red velvet",
//   "description": "Layer cake with cream cheese frosting",
//   "price": "4.00",
//   "discountPrice": null,
//   "category": "dessert"
// },
// {
//   "id": 19,
//   "name": "Cheesecakes",
//   "description": "Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar",
//   "price": "4.50",
//   "discountPrice": null,
//   "category": "dessert"
// },
// {
//   "id": 20,
//   "name": "Creme brulee",
//   "description": "Delicate creamy dessert in a caramel basket with wild berries",
//   "price": "4.00",
//   "discountPrice": null,
//   "category": "dessert"
// },
// {
//   "id": 21,
//   "name": "Pancakes",
//   "description": "Tender pancakes with strawberry jam and fresh strawberries",
//   "price": "4.50",
//   "discountPrice": null,
//   "category": "dessert"
// },
// {
//   "id": 22,
//   "name": "Honey cake",
//   "description": "Classic honey cake with delicate custard",
//   "price": "4.50",
//   "discountPrice": null,
//   "category": "dessert"
// },
// {
//   "id": 23,
//   "name": "Chocolate cake",
//   "description": "Cake with hot chocolate filling and nuts with dried apricots",
//   "price": "5.50",
//   "discountPrice": null,
//   "category": "dessert"
// },
// {
//   "id": 24,
//   "name": "Black forest",
//   "description": "A combination of thin sponge cake with cherry jam and light chocolate mousse",
//   "price": "6.50",
//   "discountPrice": null,
//   "category": "dessert"
// },
// {
//   "id": 25,
//   "name": "Apple pie",
//   "description": "Classic apple pie with cinnamon",
//   "price": "4.00",
//   "discountPrice": "3.75",
//   "category": "dessert"
// },
// {
//   "id": 26,
//   "name": "Fruit tart",
//   "description": "Shortcrust pastry tart with fresh fruits",
//   "price": "5.00",
//   "discountPrice": "4.75",
//   "category": "dessert"
// },
// {
//   "id": 27,
//   "name": "Lemon mousse",
//   "description": "Light lemon mousse with whipped cream",
//   "price": "4.50",
//   "discountPrice": "4.25",
//   "category": "dessert"
// },
// {
//   "id": 28,
//   "name": "Brownie",
//   "description": "Rich chocolate brownie with walnuts",
//   "price": "5.00",
//   "discountPrice": "4.75",
//   "category": "dessert"
// },
// {
//   "id": 29,
//   "name": "Jasmine Pearl",
//   "description": "Delicate green tea rolled into pearls with jasmine aroma",
//   "price": "5.00",
//   "discountPrice": "4.75",
//   "category": "tea"
// },
// {
//   "id": 30,
//   "name": "Berry Hibiscus",
//   "description": "Fruit tea with hibiscus and mixed berries",
//   "price": "5.50",
//   "discountPrice": "5.25",
//   "category": "tea"
// },
// {
//   "id": 31,
//   "name": "Tiramisu",
//   "description": "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
//   "price": "5.50",
//   "discountPrice": "5.25",
//   "category": "dessert"
// },
// {
//   "id": 32,
//   "name": "Pavlova",
//   "description": "Crispy meringue dessert with whipped cream and fresh fruit",
//   "price": "5.00",
//   "discountPrice": "4.75",
//   "category": "dessert"
// }
