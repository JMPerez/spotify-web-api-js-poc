/* run with `babel-node examples/custom-request.js` */
import { RequestBuilder, Request } from '../lib/server';
import { getAlbum } from '../lib/endpoints/album';

class MyRequest extends Request {
  send() {
    return new Promise((resolve, reject) =>
      super.send()
        .then(d => resolve(d))
        .catch(e => {
          if (e.statusCode === 409) {
            console.log('I need to refresh the token');
            // refresh it
            // retry request using `super.send()`
            return super.send();
          } else {
            console.log('There was an error. Log it somewhere');
            reject(e);
          }
        })
      );
  }
}

const requestBuilder = new RequestBuilder(MyRequest);
getAlbum(requestBuilder, '<non_existing_id>')
  .then(result => console.log(result))
  .catch(error => console.error(error));
