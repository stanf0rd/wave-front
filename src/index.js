import AppManager from './modules/app_manager';
import Router from './modules/router';
import { globalBus } from './modules/bus';
import preparer from './modules/prepare';

import Loader from './core/Loader/Loader.svelte';
import Wave from './core/Wave/Wave.svelte';
import AppContainer from './core/Container/Container.svelte';
import Frame from './apps/Frame/Frame.svelte';

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

const router = new Router(appManager);

router.start();

preparer.add('Get user data', globalBus.getPromise('userUpdated'), true);
preparer.prepare();
