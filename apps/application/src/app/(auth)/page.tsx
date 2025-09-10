"use client";

import { Logo } from "@/components/logo";
import { LoginForm } from "@/features/auth/components/login-form";

const AuthPage = () => {
  return (
    <div className="container max-w-md mx-auto my-8 border p-8 rounded-lg shadow">
      <div className="flex flex-col items-center justify-center mb-8">
        <Logo />
        <h3 className="text-md font-extrabold text-primary">Autoconnect</h3>
        <div className="w-full mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
