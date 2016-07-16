/* run with `babel-node examples/search.js` */
import { RequestBuilder } from '../lib/server';
import { searchAlbums } from '../lib/endpoints/search';

const requestBuilder = new RequestBuilder();

searchAlbums(requestBuilder, 'abba')
  .then(result => console.log(result))
  .catch(error => console.error(error));
