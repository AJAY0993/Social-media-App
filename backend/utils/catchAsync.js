module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch((error) => {
    console.log(error);
    next(error);
  });
};
