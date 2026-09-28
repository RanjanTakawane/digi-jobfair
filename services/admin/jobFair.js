import { JobFairRepository } from "@/repositories/jobFair.repository";

import { generateSecureToken } from "@/utils/generateToken";

import { generateJobFairCode } from "@/utils/generateCode";

export class JobFairService {

    
  static async createJobFair(data) {
    let jobFairCode;

    // Make sure generated code isn't already used
    while (true) {
      jobFairCode = generateJobFairCode();

      const existing = await JobFairRepository.getByCode(jobFairCode);

      if (!existing) break;
    }

    const candidateRegistrationToken = generateSecureToken();

    const companyParticipationToken = generateSecureToken();

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const candidateRegistrationUrl = `${baseUrl}/candidate/register/${candidateRegistrationToken}`;

    const companyParticipationUrl = `${baseUrl}/company/participate/${companyParticipationToken}`;

    const jobFairData = {
      jobFairCode,

      name: data.name.trim(),

      description: data.description?.trim() || "",

      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),

      startTime: data.startTime || "",
      endTime: data.endTime || "",

      registrationStartDate: data.registrationStartDate
        ? new Date(data.registrationStartDate)
        : null,

      registrationEndDate: data.registrationEndDate
        ? new Date(data.registrationEndDate)
        : null,

      venueName: data.venueName.trim(),

      address: data.address?.trim() || "",

      city: data.city?.trim() || "",

      district: data.district?.trim() || "",

      state: data.state?.trim() || "",

      pincode: data.pincode?.trim() || "",

      organizerName: data.organizerName?.trim() || "",

      organizerEmail: data.organizerEmail?.trim().toLowerCase() || "",

      organizerPhone: data.organizerPhone?.trim() || "",

      expectedCandidates: Number(data.expectedCandidates || 0),

      expectedCompanies: Number(data.expectedCompanies || 0),

      candidateRegistrationToken,

      companyParticipationToken,

      candidateRegistrationUrl,

      companyParticipationUrl,

      status: data.status || "draft",
    };

    console.log("Creating Job Fair:", jobFairData);

    const createdJobFair = await JobFairRepository.create(jobFairData);

    console.log("Job Fair created successfully:", createdJobFair._id);

    return createdJobFair;
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
