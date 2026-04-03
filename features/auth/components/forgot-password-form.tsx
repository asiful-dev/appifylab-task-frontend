"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useForgotPassword } from "@/features/auth/hooks/use-forgot-password";
import { APP_ROUTES } from "@/shared/libs/constants";
import { Button } from "@/shared/ui-components/controls/button";
import { Input } from "@/shared/ui-components/controls/input";
import { Label } from "@/shared/ui-components/controls/label";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/shared/validators/auth.schema";
import { getAuthErrorMessage } from "@/features/auth/utils/auth-error";

export function ForgotPasswordForm() {
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordInput) {
    try {
      const response = await forgotPasswordMutation.mutateAsync(values);
      toast.success(response.message || "Reset email sent");
    } catch (error) {
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
        Forgot Password
      </h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Enter your email address and we&apos;ll send you a reset link.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="forgotEmail">Email</Label>
          <Input id="forgotEmail" type="email" {...register("email")} />
          {errors.email?.message ? (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          ) : null}
        </div>

        <Button
          type="submit"
          className="h-12 w-full"
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? "Sending..." : "Send reset link"}
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
