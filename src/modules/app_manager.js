import { globalBus } from './bus';
import user from './user';

export default class AppManager {
  /**
   * Initiates AppManager
   *
   * @param mainApp svelte-MainApp instance
   * @param appContainer svelte-Container instance
   */
  constructor(mainApp, appContainer) {
    this.appClasses = {};
    this.appInstances = {};
    this.startedAppsOrder = [];

    this.mainApp = mainApp;
    this.appContainer = appContainer;

    globalBus.on('regApp', this.registerApp.bind(this));
  }


  /**
   * Registeres app class
   *
   * @param {String} appName used as unique app url
   * @param {BaseApplication} App app class
   * @param {object} data properties send to app on init
   * @throws {Error} app with this appName alreaddy registered
   * @memberof AppManager
   */
  registerApp(name, App, data) {
    if (name in this.appClasses) {
      throw new Error(`App with name ${name} is already registered.`);
    }

    this.appClasses[name] = { App, data };
    return this;
  }


  /**
   * Proceeds request for active app switch
   * or state change of current active app
   *
   * @param {String} id name or id of app to switch/change
   * @param {Object} [options={}] view and other app params
   * @returns Array of two items: name of new active app and its view name
   * @memberof AppManager
   */
  async requestApp(id, options) {
    if (!this.appExists(id)) {
      throw new Error(`App ${id} not exists`);
    }

    if (!(await this.allowedToOpen(id))) {
      return this.requestApp('main', options);
    }

    if (!this.appInited(id)) this._initApp(id);

    await this._sendAppParams(id, options);

    if (id !== this.activeAppName) {
      console.log(`[APP] ${this.activeAppName} => ${id}`);

      this._hideCurrentApp();
      this._makeAppActive(id);
    }

    return [this.activeAppName, this.activeApp.view];
  }


  closeApp(appName) {
    if (!this.appExists(appName)) {
      throw new Error(`App ${appName} not exists`);
    }

    this.appInstances[appName].$destroy();
    delete this.appInstances[appName];

    this._removeFromActive(appName);
  }


  /**
   * Checks, if app is known by AppManager, or is MainApp.
   * @param {String} id name or id of app
   * @returns {Boolean}
   * @memberof AppManager
   */
  appExists(id) {
    return (id in this.appClasses) || (id === 'main');
  }


  /**
   * Checks if it is allowed to open app.
   *
   * MainApp and terminal are always allowed.
   * Other apps want user to be logged in.
   *
   * @param {String} appName
   * @returns {Boolean}
   * @memberof AppManager
   */
  async allowedToOpen(appName) {
    this.allowedApps = ['main', 'terminal'];
    return this.allowedApps.includes(appName) || user.authorized;
  }

  /**
   * Checks if app instance was already created and not destroyed
   *
   * @param {String} appName
   * @returns {Boolean} `true` if instance exists
   * @memberof AppManager
   */
  appInited(appName) {
    return appName in this.appInstances || appName === 'main';
  }


  _initApp(appName) {
    const { App, data } = this.appClasses[appName];
    const target = this.appContainer.getTarget();
    this.appInstances[appName] = new App({ target, props: data });
  }


  _hideCurrentApp() {
    if (this.activeAppName === 'main') {
      this.mainApp.deactivate();
    } else if (this.activeAppName) {
      this.activeApp.pause();
      this.appContainer.hide();
    }
  }


  _makeAppActive(appName) {
    const app = this.appInstances[appName] || this.mainApp;

    if (app === this.mainApp) {
      this.mainApp.activate();
    } else {
      this.appContainer.show();
      app.started ? app.resume() : app.start();
    }

    this.activeApp = app;
    this.activeAppName = appName;

    if (appName !== 'main') this._addToActive(appName);
  }


  async _sendAppParams(appName, options) {
    const app = this.appInstances[appName] || this.mainApp;
    if (options) await app.$set({ ...options });
  }


  _addToActive(appName) {
    if (!this.appExists(appName)) {
      throw new Error(`App ${appName} not exists`);
    }

    if (this.startedAppsOrder.length >= 5) {
      const deletedAppName = this.startedAppsOrder[0].url;
      delete this.appInstances[deletedAppName];
      this.startedAppsOrder[0].$destroy();
      this.startedAppsOrder.shift();
    }

    const index = this.startedAppsOrder.indexOf(appName);
    if (index !== -1) {
      this.startedAppsOrder.splice(index, 1);
    }
    this.startedAppsOrder.push(appName);
  }


  _removeFromActive(appName) {
    const index = this.startedAppsOrder.indexOf(appName);
    if (index !== -1) {
      this.startedAppsOrder.splice(index, 1);
    }
  }
}
