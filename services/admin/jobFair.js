import { JobFairRepository } from "@/repositories/admin/jobFair";

import { generateSecureToken } from "@/utils/generateToken";

import { generateJobFairCode } from "@/utils/generateCode";

const MAX_CODE_ATTEMPTS = 5;

export class JobFairService {
  /**
   * @param data       allowlisted, validated fields (see validators/admin/jobFair.js)
   * @param createdBy  authenticated admin's _id (never from the request body)
   */
  static async createJobFair(data, createdBy) {
    const candidateRegistrationToken = generateSecureToken();
    const companyParticipationToken = generateSecureToken();

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const jobFairData = {
      ...data,

      candidateRegistrationToken,
      companyParticipationToken,
      candidateRegistrationUrl: `${baseUrl}/candidate/register/${candidateRegistrationToken}`,
      companyParticipationUrl: `${baseUrl}/company/participate/${companyParticipationToken}`,

      createdBy,
    };

    // The unique index on jobFairCode is the source of truth; on the (very
    // unlikely) collision, retry with a fresh code a bounded number of times.
    for (let attempt = 1; ; attempt++) {
      try {
        return await JobFairRepository.create({
          ...jobFairData,
          jobFairCode: generateJobFairCode(),
        });
      } catch (error) {
        const isCodeCollision =
          error?.code === 11000 && error.keyPattern?.jobFairCode;

        if (!isCodeCollision || attempt >= MAX_CODE_ATTEMPTS) throw error;
      }
    }
  }

  static async getJobFairs({ page, limit }) {
    const { jobFairs, total } = await JobFairRepository.getPaginated({
      page,
      limit,
    });

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return {
      jobFairs,

      pagination: {
        total,
        currentPage: page,
        limit,
        totalPages,

        hasNextPage: page < totalPages,

        hasPreviousPage: page > 1,
      },
    };
  }
}
