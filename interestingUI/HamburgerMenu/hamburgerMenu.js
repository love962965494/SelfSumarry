const $els = document.querySelectorAll('.menu a, .menu header')
const count = $els.length
const groupLength = Math.ceil(count / 3)
let groupNumber = 0
let i = 1
const oMenu = document.querySelector('.menu')

oMenu.style.setProperty('--count', count)
Array.prototype.forEach.call($els, function($el) {
  if (i > groupLength) {
    groupNumber++
    i = 1
  }
  $el.setAttribute('data-group', groupNumber)
  i++
})

document
  .querySelector('.menu footer button')
  .addEventListener('click', function(e) {
    e.preventDefault()
    Array.prototype.forEach.call($els, function($el, index) {
      const top =
        $el.getBoundingClientRect().top +
        ($el.getAttribute('data-group') * -15 - 20) + 'px'
      console.log('top: ', top)
      $el.style.setProperty('--top', top)
      $el.style.setProperty('--delay-in', index * 0.1 + 's')
      $el.style.setProperty('--delay-out', (count - index) * 0.1 + 's')
    })
    oMenu.classList.toggle('closed')
    e.stopPropagation()
  })
