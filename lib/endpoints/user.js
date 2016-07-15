import { API_HOST } from './base';

export const getUser = (req, userId) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/users/${encodeURI(userId)}`)
      .send();
