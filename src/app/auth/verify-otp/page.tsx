import { VerifyOtpSection } from "./_components/verify-otp-section";

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{
    email: string;
    type: "VERIFY_EMAIL" | "RESET_PASSWORD";
  }>;
}) {
  const { email, type } = await searchParams;

  return <VerifyOtpSection email={email} type={type} />;
}
