import JobFair from "@/models/admin/JobFair";

export class JobFairRepository {
  static async create(data) {
    return JobFair.create(data);
  }

  static async getById(id) {
    return JobFair.findOne({
      _id: id,
      isDeleted: false,
    }).lean();
  }

  static async getByCode(jobFairCode) {
    return JobFair.findOne({
      jobFairCode,
      isDeleted: false,
    }).lean();
  }

  static async getPaginated({
    page,
    limit,
  }) {
    const skip = (page - 1) * limit;

    const filter = {
      isDeleted: false,
    };

    const [jobFairs, total] =
      await Promise.all([
        JobFair.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),

        JobFair.countDocuments(filter),
      ]);

    return {
      jobFairs,
      total,
    };
  }
}