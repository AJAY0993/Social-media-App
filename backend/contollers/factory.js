const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');
const sendResponse = require('../utils/sendResponse');

const getAll = (Modal, isRestrictToCreator, feildName) =>
  catchAsync(async (req, res, next) => {
    let filter;
    if (req.params.postId) {
      filter = { post: req.params.postId };
    }
    const query = new ApiFeatures(Modal.find(filter), req.query);
    query.filter().sort().paginate();
    const docs = await query.query;
    const numDocs = await Modal.countDocuments();
    const data = {};
    data[feildName] = docs;
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 8;
    data.nextPage = numDocs > page * limit ? page + 1 : undefined;
    sendResponse(res, 200, 'Docs fetched successfully', data);
  });

const createOne = (Modal) =>
  catchAsync(async (req, res) => {
    const newDoc = await Modal.createOne(req.body);
    sendResponse(res, 201, 'Document created successfully', { newDoc });
  });

const getOne = (Modal, isRestrictToCreator, feildName) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Modal.findById(id);
    if (!doc) {
      return next(new AppError(404, 'No document found with this Id'));
    }
    const data = {};
    data[feildName] = doc;
    sendResponse(res, 200, 'Document fetched successfully', data);
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
  getAll,
  createOne,
  getOne,
  deleteOne,
};
