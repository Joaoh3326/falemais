class PlanRepository {
  constructor({ PlanModel }) {
    this.Plan = PlanModel;
  }

  findAll() {
    return this.Plan.find({});
  }

  findById(id) {
    return this.Plan.findById(id);
  }
}

module.exports = PlanRepository;
