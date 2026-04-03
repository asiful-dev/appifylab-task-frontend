"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useResetPassword } from "@/features/auth/hooks/use-reset-password";
import { APP_ROUTES } from "@/shared/libs/constants";
import { Button } from "@/shared/ui-components/controls/button";
import { Input } from "@/shared/ui-components/controls/input";
import { Label } from "@/shared/ui-components/controls/label";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/shared/validators/auth.schema";
import {
  applyApiFieldErrors,
  getAuthErrorMessage,
} from "@/features/auth/utils/auth-error";

export function ResetPasswordForm() {
  const resetPasswordMutation = useResetPassword();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const defaults = useMemo(
    () => ({
      token,
      password: "",
      confirmPassword: "",
    }),
    [token],
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: defaults,
    values: defaults,
  });

  async function onSubmit(values: ResetPasswordInput) {
    try {
      await resetPasswordMutation.mutateAsync(values);
      toast.success("Password reset successful. Please login.");
    } catch (error) {
      if (applyApiFieldErrors<ResetPasswordInput>(error, setError)) {
        return;
      }

      setError("root", { message: getAuthErrorMessage(error) });
    }
  }

  return (
    <div className="w-full max-w-md rounded-lg bg-card p-8 shadow-[var(--b-shadow1)]">
      <div className="mb-6 flex justify-center">
        <Image
          src="/images/logo.svg"
          alt="BuddyScript"
          width={130}
          height={42}
          priority
        />
      </div>

      <h1 className="mb-2 text-center text-2xl font-medium text-[var(--color2)]">
        Reset Password
      </h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Set your new password.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input type="hidden" {...register("token")} />

        <div className="space-y-2">
          <Label htmlFor="resetPassword">New Password</Label>
          <Input id="resetPassword" type="password" {...register("password")} />
          {errors.password?.message ? (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="resetConfirmPassword">Confirm Password</Label>
          <Input
            id="resetConfirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message ? (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          className="h-12 w-full"
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? "Updating..." : "Reset password"}
        </Button>

        {errors.root?.message ? (
          <p className="text-sm text-destructive">{errors.root.message}</p>
        ) : null}
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Back to{" "}
        <Link href={APP_ROUTES.login} className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
