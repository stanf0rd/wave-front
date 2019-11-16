import { Data } from './store';
import { getStore, getHome } from './network';

import preparer from './prepare';

const store = new Data(getStore);
const home = new Data(getHome);

preparer.add(
  'Get data from server',
  Promise.all([
    store.update(),
    home.update(),
  ]),
  true,
);

export { store, home };
