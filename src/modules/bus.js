export class Bus {
  constructor() {
    this.listeners = {};
  }

  on(event, listener, once = false) {
    (this.listeners[event] || (this.listeners[event] = [])).push({ listener, once });
  }

  off(event, listener) {
    if (!this.listeners[event]) return;
    if (listener) {
      this.listeners[event] = this.listeners[event].filter(l => l.listener !== listener);
    } else {
      this.listeners[event] = [];
    }
  }

  emit(event, ...data) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(l => l.listener(...data));
  }
}


export const globalBus = new Bus();
