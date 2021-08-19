/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const CODES = {
  CREATED: 201,
  OK: 200,
  NO_CONTENT: 204,
};

class Responses {
  _buildBody({ message, data }, statusCode) {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  }

  created(objectSuccess) {
    return this._buildBody(objectSuccess, CODES.CREATED);
  }

  ok(objectSuccess) {
    return this._buildBody(objectSuccess, CODES.OK);
  }

  noContent() {
    return this._buildBody(CODES.NO_CONTENT);
  }
}

module.exports = new Responses();
