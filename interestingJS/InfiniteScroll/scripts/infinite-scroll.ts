;((scope: Window) => {
  // Number of items to instantiate beyond current view in the scroll direction
  const RUNWAY__ITEMS = 50

  // Number of items to instantiate beyond current view in the opposite direction
  const RUNWAY__ITEMS__OPPOSITE = 10

  // The number of pixels of additional length to allow scrolling to
  const SCROLL__RUNWAY = 2000

  // The animation interval (in ms) for fading in content from tombstones
  const ANIMATION__DURATION__MS = 200

  // tslint:disable-next-line:no-empty
  scope.InfiniteScrollerSource = class implements InfiniteScrollerSource {}
  // {
  //   /**
  //    * Fetch more items from the data source. This should try to fetch at least
  //    * count items but may fetch more as desired. Subsequent calls to fetch should
  //    * fetch items following the last successful fetch
  //    *
  //    * @param {number} count The minimum number of items to fetch for display
  //    * @return {Promise(Array<Object>)} Returns a promise which will be resolved with an array of items.
  //    */
  //   // tslint:disable-next-line:no-empty
  //   public fetch = function fetch(count: number) {}

  //   /**
  //    * Create a tombstone element. All tombstone elements should be identical
  //    *
  //    * @return {Element} A tombstone element to be displayed when item data is not
  //    *    yet available for the scrolled position
  //    */
  //   // tslint:disable-next-line:no-empty
  //   public createTombstone = function createTombstone() {}

  //   /**
  //    * Render an item, re-using the provided item div if passed in.
  //    *
  //    * @param {Object} item The item description form the array returned by fetch
  //    * @param {?Element} element If provided, this is a previously displayed element
  //    *    which should be recycled for the new item to display.
  //    * @return {Element} The constructed element to be displayed in the scroller
  //    */
  //   // tslint:disable-next-line:no-empty
  //   public render = function render() {}
  // }

  /**
   * Construct an infinite scroller
   *
   * @param {Element} scroller The scrollable element to use as the infinite scroll region
   * @param {InfiniteScrollerSource} source A provider of the content to be displayed in the
   *    infinite scroll region.
   */
})(self)
