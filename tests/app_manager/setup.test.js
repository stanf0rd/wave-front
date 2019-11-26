import AppManager from '../../src/modules/app_manager';
import { MainAppMock, appContainerMock } from './mocks';

let mainAppMock;

beforeEach(() => {
  mainAppMock = new MainAppMock();
});

function init() {
  const instance = new AppManager(mainAppMock, appContainerMock);
  return instance;
}


describe('On init', () => {
  test('main app exists', () => {
    const appManager = init();
    expect(appManager.appExists('main')).toBe(true);
  });

  test('main app inited', () => {
    const appManager = init();
    expect(appManager.appInited('main')).toBe(true);
  });

  test('main app not activated', () => {
    init();
    expect(mainAppMock.activate).not.toBeCalled();
  });

  test('no more apps exists', () => {
    const appManager = init();
    ['test', 'app', 'other', Math.random().toString(36)].forEach(app => {
      expect(appManager.appExists(app)).toBe(false);
    });
  });
});


describe('On register', () => {
  test('app exists', () => {
    const appManager = init();
    const name = Math.random().toString(36);

    appManager.registerApp(name);

    expect(appManager.appExists(name)).toBe(true);
  });

  test('app not inited', () => {
    const appManager = init();
    const name = Math.random().toString(36);

    appManager.registerApp(name);

    expect(appManager.appInited(name)).toBe(false);
  });

  test('app doesn\'t duplicate', () => {
    const appManager = init();
    const name = Math.random().toString(36);

    appManager.registerApp(name);

    expect(() => appManager.registerApp(name))
      .toThrow(new Error(`App with name ${name} is already registered.`));
  });
});
