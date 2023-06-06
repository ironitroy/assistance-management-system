class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //Search Function
  search() {
    const keyword = this.queryStr.keyword
      ? {
          clientName: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // filter() {
  //   const queryCopy = { ...this.queryStr };

  //   //Removing some fields for Make
  //   const removeFields = ["keyword", "page", "limit"];

  //   removeFields.forEach((key) => delete queryCopy[key]);

  //   //Filter for Price

  //   let queryStr = JSON.stringify(queryCopy);
  //   queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

  //   this.query = this.query.find(JSON.parse(queryStr));

  //   return this;
  // }

    //Pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
