const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    if (req.method === "PATCH" && !req.body.favorite) {
      const error = new Error("missing field favorite");
      error.status = 400;
      return next(error);
    }
    if (req.method === "POST" && !req.body.email) {
      const error = new Error("missing required field email");
      error.status = 400;
      return next(error);
    }

    if (Object.keys(req.body).length === 0) {
      const error = new Error("missing fields");
      error.status = 400;
      return next(error);
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
