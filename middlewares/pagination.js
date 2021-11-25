const validate = (req, res, next) => {
  const limitQuery = req.query.limit;
  if (!limitQuery) {
    const error = new Error('Parameter "limit" is required');
    error.status = 400;
    throw error;
  }

  const limit = Number(limitQuery);
  if (isNaN(limit)) {
    const error = new Error('Parameter "limit" must be a number');
    error.status = 400;
    throw error;
  }
  if (limit < 1) {
    const error = new Error('Parameter "limit" out of range');
    error.status = 400;
    throw error;
  }

  const pageQuery = req.query.page;
  if (!pageQuery) {
    const error = new Error('Parameter "page" is required');
    error.status = 400;
    throw error;
  }

  const page = Number(pageQuery);
  if (isNaN(page)) {
    const error = new Error('Parameter "page" must be a number');
    error.status = 400;
    throw error;
  }
  if (page < 1) {
    const error = new Error('Parameter "page" out of range');
    error.status = 400;
    throw error;
  }
  next();
};

module.exports = {
  validate
};
