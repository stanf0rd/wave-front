import { globalBus } from './bus';

class Preparer {
  constructor() {
    this.preparing = {};
  }

  getPreparePromise() {
    return Promise.all(Object.values(this.preparing));
  }

  add(name, promise) {
    this.preparing[name] = promise;
  }

  prepare() {
    const itemsCount = Object.keys(this.preparing).length;
    let readyIndex = 1;

    console.log(`Preparing ${itemsCount} items`);
    console.group(`Preparing ${itemsCount} items`);

    Object.keys(this.preparing).forEach(item => {
      this.preparing[item].then(() => {
        console.log(`${item}: ${readyIndex}/${itemsCount}`);
        readyIndex += 1;
        if (readyIndex > itemsCount) {
          console.groupEnd();
        }
      });
    });

    this.getPreparePromise()
      .then(() => globalBus.emit('ready'));
  }
}

export default new Preparer();
