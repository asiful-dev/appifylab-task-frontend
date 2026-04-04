"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateProfile } from "@/features/profile/hooks/use-update-profile";
import type { User } from "@/features/profile/api/user.api";
import { APP_ROUTES } from "@/shared/libs/constants";
import { Button } from "@/shared/ui-components/controls/button";
import { Input } from "@/shared/ui-components/controls/input";
import { Label } from "@/shared/ui-components/controls/label";
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "@/shared/validators/user.schema";

export function EditProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const updateProfileMutation = useUpdateProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio ?? "",
    },
  });

  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio ?? "",
    });
  }, [reset, user.bio, user.firstName, user.lastName]);

  async function onSubmit(values: UpdateProfileInput) {
    try {
      await updateProfileMutation.mutateAsync({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        bio: values.bio?.trim() || undefined,
      });
      toast.success("Profile updated");
      router.push(APP_ROUTES.profile);
    } catch {
      toast.error("Unable to update profile");
    }
  }

  return (
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
        <Label htmlFor="bio">Bio</Label>
        <textarea
          id="bio"
          rows={4}
          maxLength={500}
          {...register("bio")}
          className="w-full resize-y rounded-md border border-input bg-background p-3 text-sm outline-none focus-visible:border-ring"
        />
        {errors.bio?.message ? (
          <p className="text-sm text-destructive">{errors.bio.message}</p>
        ) : null}
      </div>

      <Button type="submit" disabled={updateProfileMutation.isPending}>
        {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
