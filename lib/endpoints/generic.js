export const getGeneric = (req, url) =>
  req.build()
      .withHost(url)
      .send();
