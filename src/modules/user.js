/* eslint-disable max-classes-per-file */
import { User } from './store';
import { getProfile, login, logout } from './network';
import { globalBus } from './bus';

async function getter() {
  const res = await getProfile();
  if (!res.err) globalBus.emit('userUpdated');
  return res;
}

const user = new User(getter, login, logout, err => {
  if (err.code === '401') globalBus.emit('unauthorized');
});

globalBus.on('checkUser', user.update);

export default user;
