const error = require('./error');

exports.pagination = (User) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};
    // change model.length to model.countDocuments() because you are counting directly from mongodb
    if (endIndex < (await User.countDocuments().exec())) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      //       .limit(limit).skip(startIndex) replaced the slice method because
      //       it is done directly from mongodb and they are one of mongodb methods
      result.results = await User.find().limit(limit).skip(startIndex);
      res.paginatedResult = result;
      res.status(400).json({ result });
      next();
    } catch (e) {
      //   res.status(500).json({ message: e.message });
      error.errorResponse(res, 'There are no more products', 404, false);
    }
  };
};
