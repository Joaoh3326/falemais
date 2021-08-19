class DDDRepository {
  constructor({ DDDModel }) {
    this.DDD = DDDModel;
  }

  findAll() {
    return this.DDD.find({});
  }
}

module.exports = DDDRepository;
