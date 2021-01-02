// Implementing the Observer pattern
export class Emitter {
  constructor() {
    this.listeners = {};
  }
  // dispatch, trigger, fire...
  // Уведомляем слушателей
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    });
    return true;
  }

  // on, listen...
  // Подписываемся на уведомления
  // Добавляем нового слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    // Отписываемся от уведомлений
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listeners => listeners !== fn);
    };
  }
}

// Example
// const emitter = new Emitter();
//
// const unsub = emitter.subscribe('Roman', data => console.log('Sub:', data));
//
// setTimeout(() => {
//   emitter.emit('Roman', 'After 2 second');
// }, 2000);
//
// setTimeout(() => {
//   unsub();
// }, 3000);
//
// setTimeout(() => {
//   emitter.emit('Roman', 'After 4 second');
// }, 4000);
