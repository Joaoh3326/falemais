/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const CODES = {
  INTERNAL_ERROR: 500,
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
};

class RequestErrors {
  _buildBody({ message, data }, statusCode) {
    return {
      success: false,
      statusCode,
      message,
      data,
    };
  }

  _handlerError(statusCode, error) {
    return this._buildBody({
      message: error.message,
      data: error,
    }, statusCode);
  }

  internalError(error) {
    return this._handlerError(CODES.INTERNAL_ERROR, error);
  }

  unprocessableEntity(error) {
    return this._handlerError(CODES.UNPROCESSABLE_ENTITY, error);
  }

  notFound(error) {
    return this._handlerError(CODES.NOT_FOUND, error);
  }
}

module.exports = new RequestErrors();
