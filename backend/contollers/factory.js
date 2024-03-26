const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendResponse = require('../utils/sendResponse');

const createOne = (Modal, isRestrictToCreator) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Modal.createOne(req.body);
    sendResponse(res, 201, 'Document created successfully', { newDoc });
  });

const getOne = (Modal, isRestrictToCreator) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Modal.findById(id);
    if (!doc) {
      return next(new AppError(404, 'No document found with this Id'));
    }
    sendResponse(res, 200, 'Document created successfully', { doc });
  });

const deleteOne = (Modal, isRestrictToCreator) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let doc;
    if (isRestrictToCreator) {
      doc = await Modal.findOneAndDelete({ _id: id, user: req.user.id });
    }
    if (!isRestrictToCreator) {
      doc = await Modal.findByIdAndDelete(id);
    }
    if (!doc) {
      return next(
        new AppError(
          404,
          'No document found with this Id or you are not authorized to delete one'
        )
      );
    }
    sendResponse(res, 204, 'Document deleted successfully');
  });

module.exports = {
  createOne,
  getOne,
  deleteOne,
};
