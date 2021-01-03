import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.storeSub = null;
    this.store = options.store;
    this.prepare();
  }
  // Set up component to init
  prepare() {}

  // return component template
  toHTML() {
    return '';
  }

  // inform listeners about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // subscribe to event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn);
  }

  // component init, adding Dom listeners
  init() {
    this.initDOMListener();
  }

  // delete component, clear listeners
  destroy() {
    this.removeDOMListener();
    this.unsubscribers.forEach(unsub => unsub());
    this.storeSub.unsubscribe();
  }
}
