/* eslint-disable import/prefer-default-export */

export function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
