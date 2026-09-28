import CandidateRegisterForm from "@/components/candidate/CandidateRegisterForm";
import {
  getOpenJobFair,
  RegistrationError,
} from "@/services/candidate/candidateRegistration";

export const metadata = { title: "Candidate Registration" };

export default async function CandidateRegisterPage({ params }) {
  const { token } = await params;

  let unavailableMessage = null;

  try {
    await getOpenJobFair(token);
  } catch (error) {
    if (!(error instanceof RegistrationError)) throw error;

    unavailableMessage = error.message;
  }

  return (
    <div className="min-h-screen bg-[#f0ebf8] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {unavailableMessage ? (
          <div className="rounded-xl border border-zinc-200 border-t-[10px] border-t-[#673ab7] bg-white px-6 py-14 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-zinc-900">
              Registration unavailable
            </h1>
            <p className="mt-2 text-zinc-600">{unavailableMessage}</p>
          </div>
        ) : (
          <CandidateRegisterForm token={token} />
        )}
      </div>
    </div>
  );
}
