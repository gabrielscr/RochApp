import { Environment } from "../common/base/env-factory";

/* Dev Environment */

let env: Environment = {
  apiUrl: 'http://localhost:3333/',
  storeUrl: 'https://localhost:3333/api/Image/Download?file=',
}

let win = window as any;

win.__env = env;
