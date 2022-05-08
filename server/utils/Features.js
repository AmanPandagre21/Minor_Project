class Features {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // filter
  filter() {
    let queryCopy = { ...this.queryStr };

    let remove = ["page", "limit"];

    remove.forEach((key) => delete queryCopy[key]);

    let querystr = JSON.stringify(queryCopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (ele) => `$${ele}`);

    this.query = this.query.find(JSON.parse(querystr));
    return this;
  }

  pagination(resultPerPage) {
    const { page } = this.queryStr || 1;
    const skip = resultPerPage * (page - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = Features;
