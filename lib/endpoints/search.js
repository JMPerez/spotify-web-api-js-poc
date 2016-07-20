import { API_HOST } from './base';

export const search = (req, query, types, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath('/search')
      .withQueryParameters(
        Object.assign({}, {
          type: types.join(','),
          q: query
        }, options))
      .send();

export const searchAlbums = (req, query, options) =>
  search(req, query, ['album'], options);

export const searchArtists = (req, query, options) =>
  search(req, query, ['artist'], options);

export const searchTracks = (req, query, options) =>
  search(req, query, ['track'], options);

export const searchPlaylists = (req, query, options) =>
  search(req, query, ['playlist'], options);
