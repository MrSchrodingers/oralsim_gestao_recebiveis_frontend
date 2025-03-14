import { Suspense } from "react";
import LoginForm from "../sign-in/LoginForm";

export default function SignUpPage() {
  return (
    <Suspense>
      <LoginForm mode="signup" />
    </Suspense>
  );
}
