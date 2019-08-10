import { globalBus } from './bus';
import { logout, getProfile } from './network';

import { user } from './stores';

class UserService {
  constructor() {
    this.user = {};
    globalBus.on('checkUser', () => this.update());

    this.update();
  }


  async isLoggedIn() {
    await this.updatePromise;
    return Boolean(this.user);
  }


  async getUser() {
    await this.updatePromise;

    if (!this.user) {
      globalBus.emit('unathorized');
      return { err: 'unathorized' };
    }

    return { user: this.user };
  }

  async update(action) {
    this.updatePromise = this.__update(action);
    await this.updatePromise;
    globalBus.emit('userUpdated');
  }


  async __update(action) {
    if (action === 'logout') {
      this.user = null;

      logout();
    } else {
      const { err, profile } = await getProfile();
      if (err) {
        if (err.status !== 401) console.error(err);
        this.user = null;
      } else {
        this.user = profile;
      }
    }

    user.set(this.user);
    return this.user;
  }
}


export default new UserService();
