;(() => {
  const header = document.querySelector('header')!
  const menuHeader = document.querySelector('.menu__header')!

  // After dom loaded
  document.addEventListener('DOMContentLoaded', () => {
    // On initial load to check connectivity
    if (!navigator.onLine) {
      updateNetworkStatus()
    }

    window.addEventListener('online', updateNetworkStatus, false)
    window.addEventListener('offline', updateNetworkStatus, false)
  })

  // To update network status
  const updateNetworkStatus = () => {
    if (navigator.onLine) {
      header!.classList.remove('app__offline')
      ;(menuHeader as HTMLElement).style.background = '#1e88e5'
    } else {
      toast('You are now offline..')
      header!.classList.add('app__offline')
      ;(menuHeader as HTMLElement).style.background = '#9e9e9e'
    }
  }
})()
