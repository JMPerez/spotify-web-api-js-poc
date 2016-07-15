import Request from './Request';

export default class {
  constructor() {
    this.accessToken = null;
  }
  set accessToken (accessToken) {
    this.accessToken = accessToken;
  }
  build() {
    const req = new Request();
    req.accessToken = this.accessToken;
    return req;
  }
}
