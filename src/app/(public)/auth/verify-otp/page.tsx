import type { OtpType } from "../../../../../types";

import { VerifyOtpSection } from "./_components/verify-otp-section";

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{
    type: OtpType;
  }>;
}) {
  const { type } = await searchParams;

  return <VerifyOtpSection type={type} />;
}
