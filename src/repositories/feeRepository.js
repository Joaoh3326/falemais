class FeeDRepository {
  constructor({ FeeModel }) {
    this.Fee = FeeModel;
  }

  findOne(query) {
    return this.Fee.findOne(query);
  }
}

module.exports = FeeDRepository;
