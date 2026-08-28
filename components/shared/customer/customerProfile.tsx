"use client";

import { FormEvent, useEffect, useState } from "react";

import { UserProfile } from "@/lib/customer";
import { getMyProfile, updateMyProfile } from "@/service/auth.service";



export function CustomerProfile() {
  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMyProfile();

        setProfile(data);
        setName(data.name);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const updated =
        await updateMyProfile({
          name,
        });

      setProfile(updated);
      setName(updated.name);

      setSuccess(
        "Profile updated successfully."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-8 md:px-8">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-muted" />

        <div className="mt-6 h-80 animate-pulse rounded-2xl bg-muted" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-8 md:px-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Profile
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage your account information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-border bg-card p-6"
      >
        {error && (
          <div className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl bg-primary/10 p-3 text-sm text-primary">
            {success}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium"
          >
            Name
          </label>

          <input
            id="name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            required
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="email"
            className="text-sm font-medium"
          >
            Email
          </label>

          <input
            id="email"
            value={profile?.email ?? ""}
            disabled
            className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground"
          />

          <p className="mt-1 text-xs text-muted-foreground">
            Email cannot be changed here.
          </p>
        </div>

        {profile?.role && (
          <div className="mt-5">
            <label className="text-sm font-medium">
              Role
            </label>

            <div className="mt-2 rounded-xl border border-border bg-muted px-4 py-3 text-sm">
              {profile.role}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : "Save changes"}
        </button>
      </form>
    </main>
  );
}