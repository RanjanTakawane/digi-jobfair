import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import requireAdmin from "@/lib/requireAdmin";
import { validateJobFair } from "@/validators/admin/jobFair";
import { JobFairService } from "@/services/admin/jobFair";

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 10;

function toSafeJobFair(doc) {
  const { __v, isDeleted, ...jobFair } = doc.toObject();

  return jobFair;
}

// POST /api/v1/admin/job-fairs
export async function POST(request) {
  try {
    const { user, response } = await requireAdmin();

    if (!user) return response;

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 },
      );
    }

    const validation = validateJobFair(body);

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 },
      );
    }

    await connectDB();

    const jobFair = await JobFairService.createJobFair(
      validation.data,
      user._id,
    );

    return NextResponse.json(
      {
        success: true,
        message: "Job fair created successfully",
        data: toSafeJobFair(jobFair),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create Job Fair Error:", error.message);

    if (error?.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate job fair data detected" },
        { status: 409 },
      );
    }

    if (error?.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: "Validation failed" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create job fair" },
      { status: 500 },
    );
  }
}

// GET /api/v1/admin/job-fairs?page=1&limit=10
export async function GET(request) {
  try {
    const { user, response } = await requireAdmin();

    if (!user) return response;

    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);

    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, parseInt(searchParams.get("limit"), 10) || DEFAULT_LIMIT),
    );

    await connectDB();

    const result = await JobFairService.getJobFairs({ page, limit });

    return NextResponse.json(
      {
        success: true,
        data: result.jobFairs,
        pagination: result.pagination,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Fetch Job Fairs Error:", error.message);

    return NextResponse.json(
      { success: false, message: "Failed to fetch job fairs" },
      { status: 500 },
    );
  }
}
