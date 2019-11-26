/* eslint-disable max-classes-per-file */
export class AppMock {
  constructor() {
    this.$set = jest.fn((...args) => {
      Object.assign(this, ...args);
    });
  }
}

export class MainAppMock extends AppMock {
  constructor() {
    super();
    this.activate = jest.fn();
    this.deactivate = jest.fn();
  }
}

export const appContainerMock = {
  hide: jest.fn(),
  show: jest.fn(),
};
