import Request from './Request';

export default class {
  constructor(RequestImplementation) {
    this._accessToken = null;
    this._RequestImplementation = RequestImplementation || Request;
  }
  set accessToken (accessToken) {
    this._accessToken = accessToken;
  }
  build() {
    const req = new this._RequestImplementation();
    req.accessToken = this._accessToken;
    return req;
  }
}
