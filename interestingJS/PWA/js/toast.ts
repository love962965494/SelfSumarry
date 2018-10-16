;((exports) => {
  const toastContainer = document.querySelector('.toast__container')!

  // To show notification
  const toast = (msg: string, options: number) => {
    if (!msg) {
      return
    }

    options = options || 3000

    const toastMsg = document.createElement('div')

    toastMsg.className = 'toast__msg'
    toastMsg.textContent = msg

    toastContainer.appendChild(toastMsg)

    // Show toast for 3 seconds and hide it
    setTimeout(() => {
      toastMsg.classList.add('toast__msg--hide')
    }, options)
    
    // Remove the element after hiding
    toastMsg.addEventListener('transitionend', (ev: TransitionEvent) => {
      (ev.target as Element).parentNode!.removeChild((ev.target as Element))
    })
  }

  exports.toast = toast
})(typeof window === 'undefined' ? module.exports : window)