import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginForm mode="signin" />
    </Suspense>
  );
}
