;(() => {
  const menuIconElement = document.querySelector('.header__icon')!
  const menuElement = document.querySelector('.menu')!
  const menuOverlayElement = document.querySelector('.menu__overlay')!

  let touchStartPoint: number = 0
  let touchMovePoint: number = 0

  
  // To show menu
  const showMenu = () => {
    ;(menuElement as HTMLElement).style.transform = 'translateX(0)'
    menuElement.classList.add('menu-show')
    menuOverlayElement.classList.add('meni__overlay--show')
  }

  // To hide menu
  const hideMenu = () => {
    ;(menuElement as HTMLElement).style.transform = 'translateX(-110%)'
    menuElement.classList.remove('menu--show')
    menuOverlayElement.classList.remove('menu__overlay--show')
    menuElement.addEventListener('transitionend', onTransitionEnd, false)
  }

  // transition end
  const onTransitionEnd = () => {
    if (touchStartPoint < 10) {
      (menuElement as HTMLElement).style.transform = 'translateX(0)'
      menuOverlayElement.classList.add('menu__overlay--show')
      menuElement.removeEventListener('transitionend', onTransitionEnd, false)
     }
  }


  // Menu click event
  menuIconElement.addEventListener('click', showMenu, false)
  menuOverlayElement.addEventListener('click', hideMenu, false)
  menuElement.addEventListener('transitionend', onTransitionEnd, false)

  // TouchStart event to find where user start the touch
  document.body.addEventListener('touchStart', (ev: TouchEvent) => {
    touchStartPoint = ev.changedTouches[0].pageX
    touchMovePoint = touchStartPoint
  }, false)

  // TouchMove event to determine user touch movement
  document.body.addEventListener('touchmove', (ev: TouchEvent) => {
    touchMovePoint = ev.touches[0].pageX

    if (touchStartPoint < 10 && touchMovePoint > 30) {
      ;(menuElement as HTMLElement).style.transform = 'translateX(0)'
    }
  }, false)

})()