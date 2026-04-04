"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "@/features/auth/hooks/use-login";
import { APP_ROUTES } from "@/shared/libs/constants";
import { Button } from "@/shared/ui-components/controls/button";
import { Checkbox } from "@/shared/ui-components/controls/checkbox";
import { Input } from "@/shared/ui-components/controls/input";
import { Label } from "@/shared/ui-components/controls/label";
import { loginSchema, type LoginInput } from "@/shared/validators/auth.schema";

import { GoogleAuthButton } from "./google-auth-button";
import {
  applyApiFieldErrors,
  getAuthErrorMessage,
} from "@/features/auth/utils/auth-error";

export function LoginForm() {
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginInput) {
    try {
      await loginMutation.mutateAsync(values);
    } catch (error) {
      if (applyApiFieldErrors<LoginInput>(error, setError)) {
        return;
      }

      setError("root", { message: getAuthErrorMessage(error) });
    }
  }

  return (
    <div className="w-full max-w-md rounded-lg bg-card p-8">
      <div className="mb-6 flex justify-center">
        <Image
          src="/images/logo.svg"
          alt="BuddyScript"
          width={130}
          height={42}
          priority
        />
      </div>

      <h1 className="mb-2 text-center text-2xl font-medium text-(--color2)">
        Log in
      </h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Welcome back to BuddyScript
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            disabled={loginMutation.isPending}
            {...register("email")}
          />
          {errors.email?.message ? (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              disabled={loginMutation.isPending}
              className="pr-10"
              {...register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute top-1/2 right-1 -translate-y-1/2"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={loginMutation.isPending}
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </Button>
          </div>
          {errors.password?.message ? (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2">
            <Checkbox
              {...register("rememberMe")}
              className="ring rounded-full"
            />
            <span>Remember me</span>
          </label>
          <Link
            href={APP_ROUTES.forgotPassword}
            className="text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {errors.root?.message ? (
          <p className="text-sm text-destructive">{errors.root.message}</p>
        ) : null}

        <Button
          type="submit"
          className="h-12 w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Signing in..." : "Login"}
        </Button>
      </form>

      <div className="my-4 flex items-center gap-3 text-sm text-(--color3)">
        <span className="h-px flex-1 bg-(--bg4)" />
        <span>Or</span>
        <span className="h-px flex-1 bg-(--bg4)" />
      </div>

      <GoogleAuthButton />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href={APP_ROUTES.register}
          className="text-primary hover:underline"
        >
          Create new account
        </Link>
      </p>
    </div>
  );
}
