import 'should';
import { getAlbum } from '../../lib/endpoints/album';

describe('Album', function() {
  it('Should fetch an album', function(done) {
    const req = {
      build: function() { return this; },
      withPath: function() { return this; },
      withHost: function() { return this; },
      send: function() { return Promise.resolve({body: ''}); }
    };

    getAlbum(req, 'abc').then(data => {
      data.body.should.equal('');
      done();
    }).catch(e => console.error(e));
  });
});
