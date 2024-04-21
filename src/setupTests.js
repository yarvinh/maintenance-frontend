// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


// import { server } from './mocks/browser';
// beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())
