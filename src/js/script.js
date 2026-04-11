let burger = document.querySelector('#hamburger')
let lista = document.querySelector('ul#menu')

burger.addEventListener('click', sumir)

function sumir() {
    lista.classList.add('some')
    lista.classList.remove('menu')
}