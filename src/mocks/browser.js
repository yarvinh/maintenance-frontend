// import {setupWorker} from "msw/browser";
import {setupServer} from 'msw/node'
import {handlers} from "./handlers";
export const server = setupServer(...handlers);