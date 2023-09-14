import { onRequest } from "firebase-functions/v2/https";

import * as jsonServer from 'json-server';
import * as cors from 'cors';
import * as path from 'path';

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, "db.json"))
const middlewares = jsonServer.defaults()

server.use(cors())
server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use(router)

// Test change on Functions
export const bffJsonServer = onRequest(server);