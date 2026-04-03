"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegister } from "@/features/auth/hooks/use-register";
import { APP_ROUTES } from "@/shared/libs/constants";
import { Button } from "@/shared/ui-components/controls/button";
import { Checkbox } from "@/shared/ui-components/controls/checkbox";
import { Input } from "@/shared/ui-components/controls/input";
import { Label } from "@/shared/ui-components/controls/label";
import {
  registerSchema,
  type RegisterInput,
} from "@/shared/validators/auth.schema";

import { GoogleAuthButton } from "./google-auth-button";
import {
  applyApiFieldErrors,
  getAuthErrorMessage,
} from "@/features/auth/utils/auth-error";

export function RegisterForm() {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  async function onSubmit(values: RegisterInput) {
    try {
      await registerMutation.mutateAsync(values);
    } catch (error) {
      if (applyApiFieldErrors<RegisterInput>(error, setError)) {
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
        Create Account
      </h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Join BuddyScript and start connecting
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register("firstName")} />
            {errors.firstName?.message ? (
              <p className="text-sm text-destructive">
                {errors.firstName.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register("lastName")} />
            {errors.lastName?.message ? (
              <p className="text-sm text-destructive">
                {errors.lastName.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="registerEmail">Email</Label>
          <Input id="registerEmail" type="email" {...register("email")} />
          {errors.email?.message ? (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="registerPassword">Password</Label>
          <Input
            id="registerPassword"
            type="password"
            {...register("password")}
          />
          {errors.password?.message ? (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message ? (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          ) : null}
        </div>

        <label className="inline-flex items-center gap-2 text-sm">
          <Checkbox {...register("agreeToTerms")} />
          <span>I agree to the Terms & Conditions</span>
        </label>
        {errors.agreeToTerms?.message ? (
          <p className="text-sm text-destructive">
            {errors.agreeToTerms.message}
          </p>
        ) : null}

        {errors.root?.message ? (
          <p className="text-sm text-destructive">{errors.root.message}</p>
        ) : null}

        <Button
          type="submit"
          className="h-12 w-full"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Creating account..." : "Register"}
        </Button>
      </form>

      <div className="my-4 flex items-center gap-3 text-sm text-[var(--color3)]">
        <span className="h-px flex-1 bg-[var(--bg4)]" />
        <span>Or</span>
        <span className="h-px flex-1 bg-[var(--bg4)]" />
      </div>

      <GoogleAuthButton />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href={APP_ROUTES.login} className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
