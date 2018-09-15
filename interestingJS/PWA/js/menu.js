;
(function () {
    var menuIconElement = document.querySelector('.header__icon');
    var menuElement = document.querySelector('.menu');
    var menuOverlayElement = document.querySelector('.menu__overlay');
    var touchStartPoint = 0;
    var touchMovePoint = 0;
    var showMenu = function () {
        ;
        menuElement.style.transform = 'translateX(0)';
        menuElement.classList.add('menu-show');
        menuOverlayElement.classList.add('meni__overlay--show');
    };
    var hideMenu = function () {
        ;
        menuElement.style.transform = 'translateX(-110%)';
        menuElement.classList.remove('menu--show');
        menuOverlayElement.classList.remove('menu__overlay--show');
        menuElement.addEventListener('transitionend', onTransitionEnd, false);
    };
    var onTransitionEnd = function () {
        if (touchStartPoint < 10) {
            menuElement.style.transform = 'translateX(0)';
            menuOverlayElement.classList.add('menu__overlay--show');
            menuElement.removeEventListener('transitionend', onTransitionEnd, false);
        }
    };
    menuIconElement.addEventListener('click', showMenu, false);
    menuOverlayElement.addEventListener('click', hideMenu, false);
    menuElement.addEventListener('transitionend', onTransitionEnd, false);
    document.body.addEventListener('touchStart', function (ev) {
        touchStartPoint = ev.changedTouches[0].pageX;
        touchMovePoint = touchStartPoint;
    }, false);
    document.body.addEventListener('touchmove', function (ev) {
        touchMovePoint = ev.touches[0].pageX;
        if (touchStartPoint < 10 && touchMovePoint > 30) {
            ;
            menuElement.style.transform = 'translateX(0)';
        }
    }, false);
})();
//# sourceMappingURL=menu.js.map