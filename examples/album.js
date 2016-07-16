/* run with `babel-node examples/album.js` */
import { RequestBuilder } from '../lib/server';
import { getAlbum } from '../lib/endpoints/album';

const requestBuilder = new RequestBuilder();

getAlbum(requestBuilder, '7dNZmdcPLsUh929GLnvvsU')
  .then(result => console.log(result))
  .catch(error => console.error(error));
