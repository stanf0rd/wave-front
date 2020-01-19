import AppManager from './modules/app_manager';
import Router from './modules/router';
import { globalBus } from './modules/bus';
import preparer from './modules/prepare';

import Loader from './core/Loader/Loader.svelte';
import Wave from './core/Wave/Wave.svelte';
import AppContainer from './core/Container/Container.svelte';
import Frame from './apps/Frame/Frame.svelte';
import Terminal from './apps/Terminal/Terminal.svelte';

const loaderDiv = document.querySelector('#loader');
new Loader({ target: loaderDiv });

const waveDiv = document.querySelector('#wave');
const appsDiv = document.querySelector('#apps');
const appManager = new AppManager(
  new Wave({ target: waveDiv }),
  new AppContainer({ target: appsDiv }),
);

appManager.registerApp(
  'test',
  Frame,
  { src: 'https://snakewave.com', title: 'test' },
);

appManager.registerApp(
  'terminal',
  Terminal,
);

preparer.add('Get user data', globalBus.getPromise('userUpdated'), true);
preparer.prepare().then(() => {
  globalBus.emit('ready');
  new Router(appManager).start();
});
