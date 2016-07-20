import { API_HOST } from './base';

export const getCategories = (req, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath('/browse/categories')
      .withQueryParameters(options)
      .send();

export const getCategory = (req, categoryId, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/browse/categories/${categoryId}`)
      .withQueryParameters(options)
      .send();

export const getCategoryPlaylists = (req, categoryId, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath(`/browse/categories/${categoryId}/playlists`)
      .withQueryParameters(options)
      .send();

export const getFeaturedPlaylists = (req, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath('/browse/featured-playlists')
      .withQueryParameters(options)
      .send();

export const getNewReleases = (req, options) =>
  req.build()
      .withHost(API_HOST)
      .withPath('/browse/new-releases')
      .withQueryParameters(options)
      .send();
