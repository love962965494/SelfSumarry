type IResolved = (value: any) => void
type IRejected = (reason: any) => void
type IExecutor = (resolve: IResolved, reject: IRejected) => void
enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

export default class Promise {
  public state: Status
  public value: any
  public reason: any
  public onResolvedCallbacks: Array<() => void>
  public onRejectedCallbacks: Array<() => void>

  constructor(executor: IExecutor) {
    this.state = Status.PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value: any) => {
      if (this.state === Status.PENDING) {
        this.state = Status.FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }

    const reject = (reason: any) => {
      if (this.state === Status.PENDING) {
        this.state = Status.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
}
