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
  search(query, ['album'], options)
      .send();

export const searchArtists = (req, query, options) =>
  search(query, ['artist'], options)
      .send();

export const searchTracks = (req, query, options) =>
  search(query, ['track'], options)
      .send();

export const searchPlaylists = (req, query, options) =>
  search(query, ['playlist'], options)
      .send();
