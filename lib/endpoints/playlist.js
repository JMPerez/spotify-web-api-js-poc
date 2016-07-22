import { API_HOST } from './base';

export const getPlaylist = (req, userId, playlistId, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/users/${encodeURIComponent(userId)}/playlists/${playlistId}`)
      .withQueryParameters(options)
      .send();

export const getPlaylistTracks = (req, userId, playlistId, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/users/${encodeURIComponent(userId)}/playlists/${playlistId}/tracks`)
      .withQueryParameters(options)
      .send();
