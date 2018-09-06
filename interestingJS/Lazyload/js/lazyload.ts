;(function Lazy() {
  // wrapper, so we can call the fuction on both load and scroll events
  function lazyload() {
    // all the images with class lazyload
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img.lazyload')
    let len = images.length

    // remove the event listener if there are no images with the class lazyload
    if (!len) {
      window.removeEventListener('scroll', lazyload)
    }

    // loop de loop
    while(len--) {
      const wH = window.innerHeight
      const offset = 100
      const yPos = images[len].getBoundingClientRect().top - wH

      // if the top of the image is within 100px from the bottom of the viewport
      if (yPos <= offset) {
        const image = images[len]
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
          let sourceLen = sources.length

          while (sourceLen--) {
            const srcsetOfSource = sources[sourceLen].getAttribute('data-srcset')
            if (srcsetOfSource) {
              sources[sourceLen].setAttribute('srcset', srcsetOfSource)
            }
          }
        }

        // wait until the new image is loaded
        image.addEventListener('load', function loadCallback () {
          // remove the class lazyload
          this.classList.remove('lazyload')
        })
      }
    }
  }

  // run on load
  lazyload()

  // run on scroll event
  window.addEventListener('scroll', lazyload)
})()