class ApiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.queryStr = querystr;
  }

  filter() {
    const excludedFields = ['sort', 'page', 'limit', 'select'];
    const queryObj = { ...this.queryStr };
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      this.query = this.query.sort(this.queryStr.sort.split(',').join(' '));
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  paginate() {
    const page = this.queryStr.page || 1;
    const limit = this.queryStr.limit || 8;
    const docsToSkip = (page - 1) * limit;
    this.query = this.query.skip(docsToSkip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
