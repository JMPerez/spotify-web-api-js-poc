import { API_HOST } from './base';

export const getMe = (req) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/me`)
      .send();

export const getUser = (req, userId) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/users/${encodeURIComponent(userId)}`)
      .send();

export const getUserPlaylists = (req, userId, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/users/${encodeURIComponent(userId)}/playlists`)
      .withQueryParameters(options)
      .send();

export const getMyPlaylists = (req, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath('/me/playlists')
      .withQueryParameters(options)
      .send();

export const getMySavedTracks = (req, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath('/me/tracks')
      .withQueryParameters(options)
      .send();

export const getMySavedAlbums = (req, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath('/me/albums')
      .withQueryParameters(options)
      .send();

export const getMyTopArtists = (req, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath('/me/top/artists')
      .withQueryParameters(options)
      .send();

export const getMyTopTracks = (req, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath('/me/top/tracks')
      .withQueryParameters(options)
      .send();
