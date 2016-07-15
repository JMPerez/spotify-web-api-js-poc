import { API_HOST } from './base';

export const getAlbum = (req, albumId) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/albums/${albumId}`)
      .send();

export const getAlbums = (req, albumIds) =>
  req.build()
      .withHost(API_HOST)
      .withPath('/albums')
      .withQueryParameters({
        'ids': albumIds.join(',')
      })
      .send();

export const getAlbumTracks = (req, albumId, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/v1/albums/${albumId}/tracks`)
      .withQueryParameters(options)
      .send();
