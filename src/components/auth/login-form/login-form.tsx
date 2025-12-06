"use client";

import { useState, useActionState } from "react";
import { login, signup } from "@/app/(auth)/login/actions";
import { LoginFormFields } from "./login-form-fields";
import { LoginFormSubmit } from "./login-form-submit";
import { AuthToggle } from "./auth-toggle";
import { MessageError } from "@/components/ui/message/message-error";
import { MessageSuccess } from "@/components/ui/message/message-success";

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  
  // useActionState handles the action return values automatically
  // No try/catch needed - errors are returned as { error: string } from the action
  const [loginState, loginAction] = useActionState(login, null);
  const [signupState, signupAction] = useActionState(signup, null);

  const currentState = isLogin ? loginState : signupState;
  const currentAction = isLogin ? loginAction : signupAction;

  return (
    <>
      <AuthToggle isLogin={isLogin} onToggle={setIsLogin} />
      <form action={currentAction} className="space-y-4">
        <LoginFormFields />

        {/* Display error if action returns { error: string } */}
        {currentState?.error && (
          <MessageError>{currentState.error}</MessageError>
        )}

        {/* Display success message if action returns { message: string } */}
        {currentState?.message && (
          <MessageSuccess>{currentState.message}</MessageSuccess>
        )}

        <LoginFormSubmit />
      </form>
    </>
  );
}

