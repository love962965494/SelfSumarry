;(function Lazyest() {
  // debounced scroll event
  function _scroll(func: () => void, timeout?: number) {
    window.addEventListener('scroll', function() {
      clearTimeout(timeout)
      timeout = this.setTimeout(func, 200)
    })
    return func
  }

  // main function wrapper 
  function lazyestLoad() {
    // all the images with class lazyestload
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img.lazyestload')
    let len = images.length

    // loop de loop
    while(len--) {
      const wH = window.innerHeight
      const image = images[len]
      const boundingRect = image.getBoundingClientRect()
      const offset = 100
      const yPositionTop = boundingRect.top - wH
      const yPositionBottom = boundingRect.bottom

      // if the top of the image is within 100px from the bottom of the viewport
      // and if the bottom of the image is within 100px from the top of the viewport
      // basically if the image is in the viewport, with a bit of buffer
      if (yPositionTop <= offset && yPositionBottom >= -offset) {
        // replace the src with the data-src
        const src = image.getAttribute('data-src')
        if (src) {
          image.setAttribute('src', src)
        }

        // replace the srcset with the data-srcset
        const srcset = image.getAttribute('data-srcset')
        if (srcset) {
          image.setAttribute('srcset', srcset)
        }

        // replace the source srcset's with the data-srcset's
        const parentElement = image.parentElement
        if (parentElement && parentElement.tagName.toUpperCase() === 'PICTURE') {
          const sources = parentElement.querySelectorAll('source')
          let lenOfSources = sources.length
          
          while(lenOfSources--) {
            const source = sources[lenOfSources]
            const srcsetOfSource = source.getAttribute('data-srcset')
            
            if (srcsetOfSource) {
              source.setAttribute('srcset', srcsetOfSource)
            }
          }
        }

        // wait until the new image is loaded
        image.addEventListener('load', function() {
          this.classList.remove('lazyestload')
        })
      }
    }
  }

  // run on debounced scroll event and once on load
  _scroll(() => {
    lazyestLoad()
  })()
})()