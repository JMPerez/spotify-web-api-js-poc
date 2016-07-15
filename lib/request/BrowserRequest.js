export default class {
  constructor(method, url) {
    this.method = method;
    this.url = url;
    this.postData = null;
    this.queryParameters = null;
    this._headers = [];
    return this;
  }

  // todo: add postData
  withQueryParameters(queryParameters) {
    this.queryParameters = queryParameters;
  }

  set(headerName, headerValue) {
    this._headers.push([headerName, headerValue]);
    return this;
  }

  _buildQueryString() {
    let qs = '';
    const queryParameters = this.queryParameters;
    if (queryParameters) {
      Object.keys(this.queryParameters).forEach(key => {
        const value = this.queryParameters[key];
        qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
      });
      qs = `?${qs.substring(0, qs.length - 1)}`;
    }
    return qs;
  }

  send() {
    const req = new XMLHttpRequest();
    req.open(this.method, `${this.url}${this._buildQueryString()}`);

    this._headers.forEach(header => {
      req.setRequestHeader(header[0], header[1]);
    });
    return new Promise((resolve, reject) => {
      req.onreadystatechange = () => {
        if (req.readyState === 4) {
          let data = null;
          try {
            data = req.responseText ? JSON.parse(req.responseText) : '';
          } catch (e) {
            console.error(e);
          }
          if (req.status >= 200 && req.status < 300) {
            resolve({body: data});
          } else {
            reject(req);
          }
        }
      };

      if (this.method === 'GET') {
        req.send(null);
      } else {
        req.send(this.postData ? JSON.stringify(this.postData) : null);
      }
    });
  }
}
