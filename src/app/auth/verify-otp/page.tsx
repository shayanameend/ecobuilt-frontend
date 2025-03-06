import { VerifyOtpSection } from "./_components/verify-otp-section";

export default function VerifyOtpPage({
  searchParams,
}: {
  searchParams: {
    email: string;
    type: "VERIFY_EMAIL" | "RESET_PASSWORD";
  };
}) {
  const { email, type } = searchParams;

  return <VerifyOtpSection email={email} type={type} />;
}
