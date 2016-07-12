# spotify-web-api-js-poc

This is a proof of concept for a universal JS wrapper for the Spotify Web API.

## Why

I have previously worked on [a client-side JS wrapper](https://github.com/JMPerez/spotify-web-api-js) and [a Node.JS one](https://github.com/thelinmichael/spotify-web-api-node). They work great, but they have some limitations in their current shape:

**All the helper functions are kept in the same file**

If you have a look at [this file](https://github.com/JMPerez/spotify-web-api-js/blob/master/src/spotify-web-api.js) or [this other one](https://github.com/thelinmichael/spotify-web-api-node/blob/master/src/spotify-web-api.js) you'll see that they are a long list of similar functions without a clear grouping. This is quite bad for maintainability since it makes finding a specific bit of code difficult.

The test files covering them are equally convoluted and difficult to reason about.

**No way to inject code before or after a request**

In some cases one might want to run the same bit of code before or after a request. For instance, it might be useful to add a throttle function before making a request, or some logic to refresh an expired token and retry the request if the current request fails.

There wrappers encapsulate the request object for the good, but prevent these custom additions.

**No way to get rid off functions not used**

Even if you just want to search for tracks, your code will contain functions to make requests to every endpoint in the Web API. This only grows over time. What if we could just have code for the endpoints we use?

## How

I have been using ES2015 these last weeks and I enjoyed both its syntax and the way to export certain parts of a module. By using tree-shaking (some people prefer calling this [dead code elimination](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)) we can generate a bundle that only contains the `import`ed functions for the needed endpoints. Even better, exported functions names [can be further optimised thanks to mangling](https://gist.github.com/sokra/27b24881210b56bbaff7#es6-export-mangling).

Last, but not least, by decoupling the request configurator from the actual function that makes the request we gain testability and flexibility. First, because most of the functions not need to mock the `XMLHttpRequest` or equivalent object. Second, because the consumer of the API can always provide a different "request maker" with custom logic to trigger some events, refresh tokens, log some info, etc.

## Draft

Here is a draft of the concept. First, we split the functions that contain information about how to configure a request to several files, grouped by logic units:

```js
// search.js
export const searchTrack = (req, query) =>
  req.build()
      .withUri('/search')
      .addQueryParameters({
        type: 'track',
        query
      })
      .send();

export const searchAlbum = (req, query) => 
  req.build()
      .withUri('/search')
      .addQueryParameters({
        type: 'album',
        query
      })
      .send();

export const searchArtist = (req, query) =>
  req.build()
      .withUri('/search')
      .addQueryParameters({
        type: 'artist',
        query
      })
      .send();
```

```js
// playlist.js
export const getPlaylist = (req, userId, playlistId, options) =>
  req.build()
      .withUri(`${userId}'/playlists/${playlistId}`)
      .addQueryParameters(options);

export const createPlaylist = (req, userId, options) =>
  req.build()
      .withMethod('POST')
      .withUri(`${userId}'/playlists`)
      .addQueryParameters(options)
      .send();
```

Note also that ES2015 makes the syntax quite compact too. All these requests return a `Promise`. The support for callbacks is nice, but complicates the code and by looking at how people were using the other wrappers it is clear that Promises are preferred.

By exporting each function instead of a big object with lot of functions, we can use tree-shaking to get rid off the unused functions. Webpack 2 and Rollup support this feature, and you can see [an example with the above code on Rollup](http://rollupjs.org/#%7B%22options%22%3A%7B%22format%22%3A%22es%22%2C%22moduleName%22%3A%22myBundle%22%2C%22globals%22%3A%7B%7D%2C%22moduleId%22%3A%22%22%7D%2C%22modules%22%3A%5B%7B%22name%22%3A%22main.js%22%2C%22code%22%3A%22import%20%7B%20getPlaylist%20%7D%20from%20'.%2Fplaylist.js'%3B%5Cnconsole.log(%20getPlaylist(obj)%20)%3B%22%7D%2C%7B%22name%22%3A%22playlist.js%22%2C%22code%22%3A%22export%20const%20getPlaylist%20%3D%20(req%2C%20userId%2C%20playlistId%2C%20options)%20%3D%3E%5Cn%20%20req.build()%5Cn%20%20%20%20%20%20.withUri(%60%24%7BuserId%7D'%2Fplaylists%2F%24%7BplaylistId%7D%60)%5Cn%20%20%20%20%20%20.addQueryParameters(options)%3B%5Cn%5Cnexport%20const%20createPlaylist%20%3D%20(req%2C%20userId%2C%20options)%20%3D%3E%5Cn%20%20req.build()%5Cn%20%20%20%20%20%20.withMethod('POST')%5Cn%20%20%20%20%20%20.withUri(%60%24%7BuserId%7D'%2Fplaylists%60)%5Cn%20%20%20%20%20%20.addQueryParameters(options)%5Cn%20%20%20%20%20%20.send()%3B%22%7D%2C%7B%22name%22%3A%22search.js%22%2C%22code%22%3A%22export%20const%20searchTrack%20%3D%20(req%2C%20query)%20%3D%3E%5Cn%20%20req.build()%5Cn%20%20%20%20%20%20.withUri('%2Fsearch')%5Cn%20%20%20%20%20%20.addQueryParameters(%7B%5Cn%20%20%20%20%20%20%20%20type%3A%20'track'%2C%5Cn%20%20%20%20%20%20%20%20query%5Cn%20%20%20%20%20%20%7D)%5Cn%20%20%20%20%20%20.send()%3B%5Cn%5Cnexport%20const%20searchAlbum%20%3D%20(req%2C%20query)%20%3D%3E%20%5Cn%20%20req.build()%5Cn%20%20%20%20%20%20.withUri('%2Fsearch')%5Cn%20%20%20%20%20%20.addQueryParameters(%7B%5Cn%20%20%20%20%20%20%20%20type%3A%20'album'%2C%5Cn%20%20%20%20%20%20%20%20query%5Cn%20%20%20%20%20%20%7D)%5Cn%20%20%20%20%20%20.send()%3B%5Cn%5Cnexport%20const%20searchArtist%20%3D%20(req%2C%20query)%20%3D%3E%5Cn%20%20req.build()%5Cn%20%20%20%20%20%20.withUri('%2Fsearch')%5Cn%20%20%20%20%20%20.addQueryParameters(%7B%5Cn%20%20%20%20%20%20%20%20type%3A%20'artist'%2C%5Cn%20%20%20%20%20%20%20%20query%5Cn%20%20%20%20%20%20%7D)%5Cn%20%20%20%20%20%20.send()%3B%22%7D%5D%7D).

The last bit needed is what is going to create requests, and perform them:

```js
// requestBuilder.js
export default class {
  constructor() {
    this.baseApiHost = 'https://api.spotify.com/v1'
  }
  setAccessToken() {}
  ...
  build() {}
}

// request.js
export default class {
  constructor() {}
  ...
  withMetod() {}
  withUri() {}
  addQueryParameters() {}
}
```

The `requestBuilder` contains information about the base url for the API endpoints, as well as data related with the user's session. This can be the access token, but also refresh token if we have logic to refresh it when it expires. The `request` object is configured both using the `requestBuilder` and the information provided by the function that maps the endpoint.

The `request` can be swapped with `XMLHttpRequest` wrapped with a Promise, `fetch()` or any other request library as long as they configure the request, make it, and return a Promise.
