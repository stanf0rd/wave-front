import { globalBus } from './bus';
import user from './user';

export default class AppManager {
  /**
   * Initiates AppManager, starts and inits main app
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
   * Checks, if app is known by AppManager, or is MainApp.
   * @param {String} appName
   */
  appExists(appName) {
    return (appName in this.appClasses) || (appName === 'main');
  }

  /**
   * Checks if it is allowed to open app.
   *
   * MainApp and terminal are always allowed.
   * Other apps want user to be logged in.
   *
   * @param {String} appName
   * @returns {Boolean} `true` if it is allowed
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


  async openApp(appName, { view, params }) {
    if (!this.appExists(appName)) {
      throw new Error('App not exists');
    }

    if (!(await this.allowedToOpen(appName))) {
      return this.openApp('main', { view, params });
    }

    if (!this.appInited(appName)) {
      const { App, data } = this.appClasses[appName];
      const target = this.appContainer.getTarget();
      this.appInstances[appName] = new App({ target, props: data });
    }

    /**
     * App instance of application extended from BaseApp
     * @type {BaseApp}
     */
    const app = this.appInstances[appName] || this.mainApp;
    app.$set({ view, ...params });
    app.view = view;  // to cause synchronous update
    if (app === this.activeApp) {
      return [this.activeAppName, this.activeApp.view];
    }

    console.log(`[APP] ${this.activeAppName} => ${appName}`);

    // hiding previous app
    if (this.activeAppName === 'main') {
      await this.mainApp.deactivate();
    } else if (this.activeAppName) {
      // TODO: await close animation
      this.activeApp.pause();
      this.appContainer.hide();
    }

    // opening new
    if (app === this.mainApp) {
      await this.mainApp.activate();
    } else {
      this.appContainer.show();
      // TODO: await launch animation
      if (!app.started) {
        // TODO: show loader
        /* await */ app.start();
        // TODO: hide loader
      } else app.resume();
    }

    this.activeApp = app;
    this.activeAppName = appName;

    if (appName !== 'main') this._addToActive_(appName);

    return [this.activeAppName, this.activeApp.view];
  }


  async closeApp(appName) {
    if (!this.appExists(appName)) {
      throw new Error('App not exists');
    }

    this.appInstances[appName].$destroy();
    delete this.appInstances[appName];

    this._removeFromActive_(appName);
  }

  _addToActive_(appName) {
    if (!this.appExists(appName)) {
      throw new Error('App not exists');
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

  _removeFromActive_(appName) {
    const index = this.startedAppsOrder.indexOf(appName);
    if (index !== -1) {
      this.startedAppsOrder.splice(index, 1);
    }
  }
}
