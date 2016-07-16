import Request from './Request';

export default class {
  constructor() {
    this._accessToken = null;
  }
  set accessToken (accessToken) {
    this._accessToken = accessToken;
    return this;
  }
  build() {
    const req = new Request();
    req.accessToken = this.accessToken;
    return req;
  }
}
