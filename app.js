const path = require('path');
const moment = require('moment');
require('moment/locale/es');

moment.locale('es');

let nodeEv = process.env.NODE_ENV || "";

if (nodeEv) {
  nodeEv = nodeEv.trim().toLocaleLowerCase();
  if (nodeEv && nodeEv === "development") {
    require('dotenv').config({ path: path.resolve(process.cwd(), "ENV/local.env") });
  }
}

const Server = require('./models/server');

const server = new Server();

server.listen();
