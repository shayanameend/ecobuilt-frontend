import { VerifyOtpSection } from "./_components/verify-otp-section";

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{
    email: string;
    type: "VERIFY" | "RESET";
  }>;
}) {
  const { email, type } = await searchParams;

  return <VerifyOtpSection email={email} type={type} />;
}
