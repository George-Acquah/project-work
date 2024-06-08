import OTP from "@/components/auth/otp-component";
import { useLocalSearchParams } from "expo-router";

interface _IOtpParams extends SearchParamsKeys {
  from: string;
}
const OTPScreen = ({}) => {
  const params = useLocalSearchParams<_IOtpParams>();
  const { from  } = params;
  return <OTP from={from} />
}

export default OTPScreen;