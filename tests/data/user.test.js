import { writable } from 'svelte/store';

import { sleep } from '../../src/modules/utils';
import { User } from '../../src/modules/store';


const createGetter = value => jest.fn(async () => {
  await sleep(100);
  return { data: value };
});

const login = jest.fn(async () => {
  await sleep(100);
});

const logout = jest.fn(async () => {
  await sleep(100);
});

const createErrorRequest = error => jest.fn(async () => {
  await sleep(100);
  return error;
});

const onError = jest.fn();


describe('On login', () => {
  test('data automatically received', async () => {
    // arrange
    const value = Math.random();
    const user = new User(createGetter(value), login, logout, onError);

    // act
    await user.login();

    // assert
    expect(writable().set).toBeCalledWith(value);
  });
});


describe('On error login', () => {
  test('onError called', async () => {
    // arrange
    const error = Math.random();
    const user = new User(createGetter(), createErrorRequest(error), logout, onError);

    // act
    await user.login();

    // assert
    expect(onError).toBeCalledWith(error);
  });

  test('authorized returns true', async () => {
    // arrange
    const value = Math.random();
    const user = new User(createGetter(value), login, logout, onError);

    // act
    await user.login();

    // assert
    expect(user.authorized).toBe(true);
  });
});


describe('On logout', () => {
  test('data immideately drops', async () => {
    // arrange
    const value = Math.random();
    const user = new User(createGetter(value), login, logout, onError);

    // act
    await user.login();
    user.logout();

    // assert
    expect(writable().set).lastCalledWith(null);
  });


  test('authorized returns false immideately', async () => {
    // arrange
    const value = Math.random();
    const user = new User(createGetter(value), login, logout, onError);

    // act
    await user.login();
    user.logout();

    // assert
    expect(user.authorized).toBe(false);
  });


  test('onError called on error', async () => {
    // arrange
    const error = Math.random();
    const user = new User(createGetter(), login, createErrorRequest(error), onError);

    // act
    await user.login();
    await user.logout();

    // assert
    expect(onError).toBeCalledWith(error);
  });
});
