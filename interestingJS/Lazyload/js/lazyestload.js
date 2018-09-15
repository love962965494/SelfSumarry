;
(function Lazyest() {
    function _scroll(func, timeout) {
        window.addEventListener('scroll', function () {
            clearTimeout(timeout);
            timeout = this.setTimeout(func, 200);
        });
        return func;
    }
    function lazyestLoad() {
        var images = document.querySelectorAll('img.lazyestload');
        var len = images.length;
        while (len--) {
            var wH = window.innerHeight;
            var image = images[len];
            var boundingRect = image.getBoundingClientRect();
            var offset = 100;
            var yPositionTop = boundingRect.top - wH;
            var yPositionBottom = boundingRect.bottom;
            if (yPositionTop <= offset && yPositionBottom >= -offset) {
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
                    var lenOfSources = sources.length;
                    while (lenOfSources--) {
                        var source = sources[lenOfSources];
                        var srcsetOfSource = source.getAttribute('data-srcset');
                        if (srcsetOfSource) {
                            source.setAttribute('srcset', srcsetOfSource);
                        }
                    }
                }
                image.addEventListener('load', function () {
                    this.classList.remove('lazyestload');
                });
            }
        }
    }
    _scroll(function () {
        lazyestLoad();
    })();
})();
//# sourceMappingURL=lazyestload.js.map