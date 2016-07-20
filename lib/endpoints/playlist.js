import { API_HOST } from './base';

export const getPlaylist = (req, userId, playlistId) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/users/${encodeURIComponent(userId)}/playlists/${playlistId}`)
      .send();
