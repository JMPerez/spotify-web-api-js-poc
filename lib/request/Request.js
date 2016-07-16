export default class Request {
  constructor() {
    this._accessToken = null;
    this._host = host;
    this.path = null;
    this.queryParameters = null;
    this.method = 'GET';
  }
  static setRequestImplementation(implementation) {
    this.Implementation = implementation;
  }
  set accessToken (accessToken) {
    this._accessToken = accessToken;
  }
  withHost(host) {
    this._host = host;
    return this;
  }
  withPath(path) {
    this.path = path;
    return this;
  }
  withQueryParameters(queryParameters) {
    this.queryParameters = queryParameters;
    return this;
  }
  withMethod(method) {
    this.method = method;
    return this;
  }
  send() {
    const request = new Request.Implementation(this.method, `${this._host}${this.path}`);
    request.withQueryParameters(this.queryParameters);
    if (this.accessToken) {
      request.addHeader('Authentication', `Bearer ${this.accessToken}`);
    }
    request.addHeader('Accept', 'application/json');
    return request.send();
  }
}
