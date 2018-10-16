;
(function Lazy() {
    function lazyload() {
        var images = document.querySelectorAll('img.lazyload');
        var len = images.length;
        if (!len) {
            window.removeEventListener('scroll', lazyload);
        }
        while (len--) {
            var wH = window.innerHeight;
            var offset = 100;
            var yPos = images[len].getBoundingClientRect().top - wH;
            if (yPos <= offset) {
                var image = images[len];
                var src = image.getAttribute('data-src');
                if (src) {
                    image.setAttribute('src', src);
                }
                var srcset = image.getAttribute('data-srcset');
                if (srcset) {
                    image.setAttribute('srcset', srcset);
                }
                var parentElement = image.parentElement;
                if (parentElement && parentElement.tagName.toUpperCase() === 'PICTURE') {
                    var sources = parentElement.querySelectorAll('source');
                    var sourceLen = sources.length;
                    while (sourceLen--) {
                        var srcsetOfSource = sources[sourceLen].getAttribute('data-srcset');
                        if (srcsetOfSource) {
                            sources[sourceLen].setAttribute('srcset', srcsetOfSource);
                        }
                    }
                }
                image.addEventListener('load', function loadCallback() {
                    this.classList.remove('lazyload');
                });
            }
        }
    }
    lazyload();
    window.addEventListener('scroll', lazyload);
})();
//# sourceMappingURL=lazyload.js.map