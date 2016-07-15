import { API_HOST } from './base';

export const getArtist = (req, artistId) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/artists/${artistId}`)
      .send();

export const getArtists = (req, artistIds) =>
  req.build()
      .withHost(API_HOST)
      .withPath('/artists')
      .withQueryParameters({
        'ids': artistIds.join(',')
      })
      .send();

export const getArtistAlbums = (req, artistId, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/artists/${artistId}/albums`)
      .withQueryParameters(options)
      .send();

export const getArtistTopTracks = (req, artistId, country) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/artists/${artistId}/top-tracks`)
      .withQueryParameters({
        'country': country
      })
      .send();

export const getArtistRelatedArtists = (req, artistId) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/artists/${artistId}/related-artists`)
      .send();
