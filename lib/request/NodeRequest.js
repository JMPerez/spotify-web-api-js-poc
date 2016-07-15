import https from 'https';
import url from 'url';

export default class {
  constructor(method, _url) {
    this.method = method;
    this.url = _url;
    this.postData = null;
    this.queryParameters = null;
    return this;
  }
  // todo: add postData
  withQueryParameters(queryParameters) {
    this.queryParameters = queryParameters;
  }
  set(headerName, headerValue) {
    this._request.setRequestHeader(headerName, headerValue);
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
    return new Promise((resolve, reject) => {
      const parsed = url.parse(this.url);
      const options = {
        hostname: parsed.hostname,
        port: parsed.port,
        path: `${parsed.pathname}${this._buildQueryString()}`,
        method: this.method
      };

      const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        let body = '';
        res.on('readable', function read() {
          const chunk = this.read() || '';
          body += chunk;
        });

        res.on('end', () => {
          resolve({body: body, headers: headers, status: res.statusCode});
        });

        res.on('error', (e) => {
          console.error(e);
          reject(e, res);
        });
      });

      req.on('error', (e) => {
        console.error(e);
      });

      req.end();
    });
  }
}
