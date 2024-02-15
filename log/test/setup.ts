import supertest from "supertest";
import { app } from "../src/index.js";

const log = supertest(app)
// @ts-ignore
globalThis.logService = log
