/* eslint-disable max-classes-per-file */
import { writable } from 'svelte/store';


export class Data {
  constructor(getter, onError) {
    this.get = getter;
    this.onError = onError || (err => {
      throw new Error(err);
    });

    this.store = writable({});

    this.subscribe = this.store.subscribe;
  }

  // eslint-disable-next-line consistent-return
  async update() {
    if (this.updating) {
      return this.promise;
    }

    this.updating = true;

    this.promise = this.get();

    const { err, data } = await this.promise;

    err ? this.onError(err) : this.set(data);

    this.updating = false;
  }

  set(value) {
    this.value = value;
    this.store.set(this.value);
  }
}


export class User extends Data {
  constructor(getter, login, logout, onError) {
    super(getter, onError);

    this.login = async () => {
      const err = await login();
      if (!err) await this.update();
      else this.onError(err);
    };

    this.logout = async () => {
      this.set(null);
      const err = await logout();
      err && this.onError(err);
    };

    this.update();
  }

  get authorized() {
    return Boolean(this.value);
  }
}
