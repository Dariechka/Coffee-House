export default function openModal(card) {
  const body = document.body
  const background = document.querySelector('.background')

  body.classList.add('no-scroll')
  background.style.display = 'block'

  body.insertAdjacentHTML(
    `afterbegin`,
    `<div class="modal">
  <div class="modal__img"></div>
  <div class="modal__info">
    <div class="modal__info__title">
      <h2 class="menu__card__text_large">${card.name}</h2>
      <p class="menu__card__text_small letter-spacing">${card.description}</p>
    </div>
    <div class="modal__info__buttons-container">
      <p class="menu__card__text_small">Size</p>
      <div class="menu__buttons-container modal__buttons">
        <button class="menu__button modal__button active-button">
          <span class="menu__button_circle">S</span>
          <span class="menu__button_text">${card.sizes.s.size}</span>
        </button>
        <button class="menu__button modal__button">
          <span class="menu__button_circle">M</span>
          <span class="menu__button_text">${card.sizes.m.size}</span>
        </button>
        <button class="menu__button modal__button">
          <span class="menu__button_circle">L</span>
          <span class="menu__button_text">${card.sizes.l.size}</span>
        </button>
      </div>
    </div>
    <div class="modal__info__buttons-container">
      <p class="menu__card__text_small">Additives</p>
      <div class="menu__buttons-container modal__buttons">
        <button class="menu__button modal__button">
          <span class="menu__button_circle">1</span>
          <span class="menu__button_text">${card.additives[0].name}</span>
        </button>
        <button class="menu__button modal__button">
          <span class="menu__button_circle">2</span>
          <span class="menu__button_text">${card.additives[1].name}</span>
        </button>
        <button class="menu__button modal__button">
          <span class="menu__button_circle">3</span>
          <span class="menu__button_text">${card.additives[2].name}</span>
        </button>
      </div>
    </div>
    <div class="modal__info__price-container">
      <h3 class="menu__card__text_large">Total:</h3>
      <h3 class="menu__card__text_large">$7.00</h3>
    </div>
    <div class="modal__info__info-container">
      <div class="svg">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_268_9737)">
            <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_268_9737">
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <p class="modal__info__info-container_text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
    </div>
    <button class="modal__info__close">Close</button>
  </div>
</div>`
  )

  const modal = document.querySelector('.modal')
  modal.querySelector('.modal__img').style.backgroundImage = `url("${card.src}")`
  const closeButton = document.querySelector('.modal__info__close')

  body.addEventListener('click', function closeModalListener(event) {
    if (modal.contains(event.target) && !closeButton.contains(event.target)) {
      return
    }

    modal.remove()
    body.classList.remove('no-scroll')
    background.style.display = 'none'

    body.removeEventListener('click', closeModalListener)
  })
}
