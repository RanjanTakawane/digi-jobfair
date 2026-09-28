import { NextResponse } from "next/server";

import connectDB from "@/libs/db";

import { validateJobFair } from "@/validators/jobFair";

import { JobFairService } from "@/services/jobFair";

// ===================================================
// CREATE JOB FAIR
// POST /api/v1/job-fairs
// ===================================================

export async function POST(request) {
  try {
    console.log("POST /api/v1/job-fairs started");

    await connectDB();

    const body = await request.json();

    console.log("Create Job Fair Request:", body);

    const validation = validateJobFair(body);

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,

          message: "Validation failed",

          errors: validation.errors,
        },
        {
          status: 400,
        },
      );
    }

    const jobFair = await JobFairService.createJobFair(body);

    return NextResponse.json(
      {
        success: true,

        message: "Job fair created successfully",

        data: jobFair,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Create Job Fair Error:", error);

    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Duplicate job fair data detected",
        },
        {
          status: 409,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,

        message: "Failed to create job fair",
      },
      {
        status: 500,
      },
    );
  }
}

// ===================================================
// GET JOB FAIRS
// GET /api/v1/job-fairs?page=1&limit=10
// ===================================================

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    let page = Number(searchParams.get("page")) || 1;

    let limit = Number(searchParams.get("limit")) || 10;

    // Safety
    if (page < 1) {
      page = 1;
    }

    if (limit < 1) {
      limit = 10;
    }

    // Don't allow huge pagination requests
    if (limit > 100) {
      limit = 100;
    }

    console.log(`Fetching job fairs page=${page}, limit=${limit}`);

    const result = await JobFairService.getJobFairs({
      page,
      limit,
    });

    return NextResponse.json(
      {
        success: true,

        data: result.jobFairs,

        pagination: result.pagination,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Fetch Job Fairs Error:", error);

    return NextResponse.json(
      {
        success: false,

        message: "Failed to fetch job fairs",
      },
      {
        status: 500,
      },
    );
  }
}
