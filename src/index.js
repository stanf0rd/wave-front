import AppManager from './modules/app_manager';
import Router from './modules/router';
import { globalBus } from './modules/bus';

import Loader from './apps/Loader/Loader.svelte';
import Wave from './apps/Wave/Wave.svelte';

const loaderContainer = document.querySelector('#loader');
new Loader({ target: loaderContainer });

const waveContainer = document.querySelector('#wave');
const appManager = new AppManager(Wave, waveContainer);
const router = new Router(appManager);

router.start();

globalBus.on('userUpdated', () => {
  globalBus.emit('ready');
}, true);
