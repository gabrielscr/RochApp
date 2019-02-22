import { Environment } from "../common/base/env-factory";

/* Dev Environment */

let env: Environment = {
  apiUrl: 'https://localhost:44391/api/',
  storeUrl: 'https://localhost:44391/api/Image/Download?file=',
}

let win = window as any;

win.__env = env;
