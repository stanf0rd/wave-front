/* eslint-disable import/prefer-default-export */

const writableMock = {
  subscribe: jest.fn(() => 'subscribe'),
  set: jest.fn(),
};

export const writable = () => writableMock;
