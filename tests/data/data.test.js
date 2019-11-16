import { writable } from 'svelte/store';

import { sleep } from '../../src/modules/utils';
import { Data } from '../../src/modules/store';


const createGetter = value => jest.fn(async () => {
  await sleep(100);
  return { data: value };
});

const createErrorGetter = error => jest.fn(async () => {
  await sleep(100);
  return { err: error };
});

const onError = jest.fn();


describe('On init', () => {
  test('subscribe method available', async () => {
    // arrange & act
    const item = new Data(createGetter(), onError);

    // assert
    expect(item.subscribe).toBe(writable().subscribe);
  });
});


describe('On update', () => {
  test('new value set', async () => {
    // arrange
    const value = Math.random();
    const item = new Data(createGetter(value), onError);

    // act
    await item.update();

    // assert
    expect(item.value).toBe(value);
  });


  test('new store value set', async () => {
    // arrange
    const value = Math.random();
    const item = new Data(createGetter(value), onError);

    // act
    await item.update();

    // assert
    expect(writable().set).toBeCalledWith(value);
  });


  test('promise property resolves', () => {
    // arrange
    const value = Math.random();
    const item = new Data(createGetter(value), onError);

    // act
    item.update();

    // assert
    expect(item.promise).resolves.toStrictEqual({ data: value });
  });


  test('on second update getter called once', async () => {
    // arrange
    const getter = createGetter(Math.random());
    const item = new Data(getter, onError);

    // act
    item.update();
    await item.update();

    // assert
    expect(getter).toBeCalledTimes(1);
  });


  test('subscribe method still available', async () => {
    // arrange
    const value = Math.random();
    const item = new Data(createGetter(value), onError);

    // act
    await item.update();

    // assert
    expect(item.subscribe).toBe(writable().subscribe);
  });
});


describe('On error update', () => {
  test('onError callback was called', async () => {
    // arrange
    const error = Math.random();
    const item = new Data(createErrorGetter(error), onError);

    // act
    await item.update();

    // assert
    expect(onError).toBeCalledWith(error);
  });


  test('exception was thrown', async () => {
    // arrange
    const error = Math.random();
    const item = new Data(createErrorGetter(error));

    // act
    const updatePromise =  item.update();

    // assert
    await expect(updatePromise).rejects.toThrowError(new Error(error));
  });
});
