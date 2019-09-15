import { globalBus } from './bus';

/*                utils                */

/**  proceeds urlencoded params to array  */
function splitParams(string) {
  /* eslint-disable no-param-reassign */
  if (!string) return null;
  const params = {};
  if (string[0] === '?') {
    string = string.slice(1);
  }
  string
    .split('&', 5)
    .forEach((item) => {
      const [key, val] = item.split('=');
      params[key] = val;
    });
  return params;
}

/**  removes slashes from path string  */
function clearPath(string) {
  let path;
  if (string === '/') return 'main';
  if (string) {
    path = string.slice(1);
  }
  if (path.slice(-1) === '/') return path.slice(0, -1);
  return path;
}

export default class Router {
  /**
   * @param {AppManager} appManager AppManager instance
   */
  constructor(appManager) {
    this.appManager = appManager;

    this.listeners = [
      {
        target: window,
        event: 'popstate',
        method: this.openFromAddressBar.bind(this),
      },
      {
        target: document,
        event: 'click',
        method: this.openClickedLink.bind(this),
      },
    ];

    this.start = this.start.bind(this);

    globalBus.on('link', this.open.bind(this));
  }


  async start() {
    this.openFromAddressBar();

    this.listeners.forEach((listener) => {
      const { target, event, method } = listener;
      target.addEventListener(event, method);
    });
  }


  async open(fullPath, paramString) {
    const path = clearPath(fullPath);  // aaaaa/bbbbbb/cccccc/dddddd
    const params = splitParams(paramString);  // {a=1, b=2}

    let app, view;

    app = path.indexOf('/') === -1
      ? path
      : path.substring(0, path.indexOf('/'));
    if (this.appManager.appExists(app)) {
      view = path.indexOf('/') === -1
        ? ''
        : path.substring(path.indexOf('/') + 1);
    } else {
      app = 'main';
      view = path;
    }

    let [openedApp, openedView] = await this.appManager.openApp(app, { view, params });
    if (openedApp === 'main') openedApp = '';
    if (openedView) openedView = `/${openedView}`;
    const newPath = `${openedApp}${openedView}`;

    if (this.appManager.activeAppName !== app) {
      window.history.pushState(null, '', newPath);
    } else {
      window.history.replaceState(null, '', newPath);
    }
  }


  openFromAddressBar() {
    const { pathname, search } = window.location;
    this.open(pathname, search);
  }

  openClickedLink(event) {
    const anchor = event.composedPath().find(
      item => item instanceof HTMLAnchorElement,
    );

    if (anchor && (anchor.getAttribute('type') !== 'submit')) {
      event.preventDefault();
      if (anchor.pathname) {
        this.open(anchor.pathname, anchor.search);
      } else {
        const busEvent = anchor.getAttribute('event');
        if (busEvent) {
          globalBus.emit(busEvent);
        }
      }
    }
  }
}
