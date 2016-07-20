import { API_HOST } from './base';

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

export const getCurrentUserPlaylists = (req, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath('/me/playlists')
      .withQueryParameters(options)
      .send();
