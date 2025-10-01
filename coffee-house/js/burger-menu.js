const menu = document.querySelector('.header__navigation')
const button = document.querySelector('.header__burger-menu')
const cup = document.querySelector('.header__menu')
const body = document.body
const links = document.querySelectorAll('.header__navigation_item')
const logo = document.querySelector('.header__logo')
const mql = window.matchMedia('(max-width: 768px)')

mql.addEventListener('change', (e) => {
  if (!e.matches) {
    closeMenu()
  }
})

function closeMenu() {
  menu.removeAttribute('data-open')
  button.removeAttribute('data-open')
  cup.removeAttribute('data-open')
  body.classList.remove('no-scroll')
}

for (const link of links) {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    closeMenu()
    setTimeout(() => {
      window.location.href = `${link.getAttribute('href')}`
    }, 500)
  })
}

logo.addEventListener('click', (event) => {
  event.preventDefault()
  closeMenu()
})

button.addEventListener('click', function () {
  if (button.hasAttribute('data-open')) {
    closeMenu()
  } else {
    menu.setAttribute('data-open', '')
    button.setAttribute('data-open', '')
    cup.setAttribute('data-open', '')
    body.classList.add('no-scroll')
  }
})
