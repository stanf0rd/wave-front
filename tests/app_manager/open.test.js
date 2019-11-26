import AppManager from '../../src/modules/app_manager';
import { MainAppMock } from './mocks';

let mainAppMock;

beforeEach(() => {
  mainAppMock = new MainAppMock();
});

function init() {
  const instance = new AppManager(mainAppMock, {});
  return instance;
}

describe('On main app open', () => {
  test('main app activates', async () => {
    const appManager = init();

    await appManager.requestApp('main');

    expect(mainAppMock.activate).toBeCalled();
  });

  test('main app receives params', async () => {
    const appManager = init();
    const requestView = Math.random().toString(36);

    await appManager.requestApp('main', { view: requestView });

    expect(mainAppMock.$set).toBeCalledWith({ view: requestView });
  });

  test('app manager replies with main app name and current view', async () => {
    const appManager = init();
    const requestView = Math.random().toString(36);

    const [name, resultView] = await appManager.requestApp(
      'main', { view: requestView },
    );

    expect(name).toBe('main');
    expect(resultView).toBe(requestView);
  });
});
