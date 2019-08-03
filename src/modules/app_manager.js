import { globalBus } from './bus';
import userService from './userservice';

export default class AppManager {
  /**
   * Initiates AppManager, starts and inits main app
   *
   * @param MainApp MainApp class
   * @param {HTMLElement} container
   * Element which will contain main app and appContainer
   */
  constructor(MainApp, container) {
    this.appClasses = {};
    this.appInstances = {};
    this.startedAppsOrder = [];

    this.mainApp = new MainApp({ target: container });

    // this.appContainer = this.mainApp.appContainer;

    this.activeApp = this.mainApp;
    this.activeAppName = 'main';

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
  registerApp(name, App) {
    if (name in this.appClasses) {
      throw new Error(`App with name ${name} is already registered.`);
    }

    this.appClasses[name] = App;
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
    return this.allowedApps.includes(appName) || userService.isLoggedIn()
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
      await this.openApp('main', { view, params });
      return;
    }

    if (!this.appInited(appName)) {
      const App = this.appClasses[appName];
      this.appInstances[appName] = new App(appName, this.appContainer.screen);
    }

    /**
     * App instance of application extended from BaseApp
     * @type {BaseApp}
     */
    const app = this.appInstances[appName] || this.mainApp;
    app.$set({ view, ...params });
    if (app === this.activeApp) {
      return;
    }

    console.log(`[APP] ${appName} => ${this.activeAppName}`);

    // hiding previous app
    if (this.activeAppName === 'main') {
      this.appContainer.show();
      // TODO: await launch animation
      await this.mainApp.blur();
    } else if (this.activeAppName) {
      this.activeApp.pause();
    }

    if (app === this.mainApp) {
      // TODO: await close animation
      this.appContainer.hide();
      await this.mainApp.unblur();
    } else {
      // TODO: async show bar for 3 seconds
      // eslint-disable-next-line no-lonely-if
      if (!app.started) {
        // TODO: show loader
        /* await */ app.start();
        // TODO: hide loader
      } else app.resume();
    }

    this.activeApp = app;
    this.activeAppName = appName;

    if (appName !== 'main') this._addToActive_(appName);
  }


  async closeApp(appName) {
    if (!this.appExists(appName)) {
      throw new Error('App not exists');
    }

    this.appInstances[appName].stop();
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
      this.startedAppsOrder[0].stop();
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
