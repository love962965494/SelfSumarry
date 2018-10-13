import Comparator from '../../utils/comparator'

export default class Sort {
  public static initSortingCallbacks(originalCallbacks: any) {
    const callbacks = originalCallbacks || {}
    const stubCallback = () => undefined

    callbacks.compareCallback = callbacks.compareCallback || undefined
    callbacks.visitingCallback = callbacks.visitingCallback || stubCallback
 
    return callbacks
  }

  public callbacks: { compareCallback?: any, visitingCallback: any }
  public comparator: Comparator
  
  constructor(originalCallbacks: any) {
    this.callbacks = Sort.initSortingCallbacks(originalCallbacks)
    this.comparator = new Comparator(this.callbacks.compareCallback)
  }

  public sort(originalArray?: any[]) {
    throw new Error('sort method must be implemented')
  }
}