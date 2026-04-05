"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
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
    <div className="w-full max-w-md rounded-lg bg-card p-8 ">
      <div className="mb-6 flex justify-center">
        <Image
          src="/images/logo.svg"
          alt="BuddyScript"
          width={130}
          height={42}
          style={{ height: "auto" }}
          priority
        />
      </div>

      <h1 className="mb-2 text-center text-2xl font-medium text-(--color2)">
        Create Account
      </h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Join BuddyScript and start connecting
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              disabled={registerMutation.isPending}
              {...register("firstName")}
            />
            {errors.firstName?.message ? (
              <p className="text-sm text-destructive">
                {errors.firstName.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              disabled={registerMutation.isPending}
              {...register("lastName")}
            />
            {errors.lastName?.message ? (
              <p className="text-sm text-destructive">
                {errors.lastName.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="registerEmail">Email</Label>
          <Input
            id="registerEmail"
            type="email"
            disabled={registerMutation.isPending}
            {...register("email")}
          />
          {errors.email?.message ? (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="registerPassword">Password</Label>
          <div className="relative">
            <Input
              id="registerPassword"
              type={showPassword ? "text" : "password"}
              disabled={registerMutation.isPending}
              className="pr-10"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-1 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={registerMutation.isPending}
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password?.message ? (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              disabled={registerMutation.isPending}
              className="pr-10"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className="absolute right-1 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              onClick={() => setShowConfirmPassword((previous) => !previous)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              disabled={registerMutation.isPending}
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.confirmPassword?.message ? (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          ) : null}
        </div>

        <label className="inline-flex items-center gap-2 text-sm">
          <Controller
            name="agreeToTerms"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                disabled={registerMutation.isPending}
                onCheckedChange={(checked) => {
                  const value = Boolean(checked);
                  field.onChange(value);

                  if (value) {
                    clearErrors("agreeToTerms");
                  }
                }}
                onBlur={field.onBlur}
                name={field.name}
                className="ring rounded-full"
              />
            )}
          />
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

      <div className="my-4 flex items-center gap-3 text-sm text-(--color3)">
        <span className="h-px flex-1 bg-(--bg4)" />
        <span>Or</span>
        <span className="h-px flex-1 bg-(--bg4)" />
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
