"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createProviderGear,
} from "@/lib/provider/api";

import type {
  CreateGearPayload,
} from "@/lib/provider/types";

type FormState = {
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
  image: string;
};

const initialForm: FormState = {
  name: "",
  description: "",
  category: "",
  price: "",
  quantity: "1",
  image: "",
};

export default function AddGearForm() {
  const router = useRouter();

  const [form, setForm] =
    useState<FormState>(initialForm);

  const [error, setError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const validate = () => {
    if (!form.name.trim()) {
      return "Gear name is required.";
    }

    if (!form.category.trim()) {
      return "Category is required.";
    }

    if (Number(form.price) <= 0) {
      return "Price must be greater than 0.";
    }

    if (Number(form.quantity) < 1) {
      return "Quantity must be at least 1.";
    }

    return "";
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const validationError =
      validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError("");

    const payload: CreateGearPayload = {
      name: form.name.trim(),
      description:
        form.description.trim() ||
        undefined,
      category: form.category.trim(),
      price: Number(form.price),
      quantity: Number(form.quantity),
      image:
        form.image.trim() || undefined,
    };

    try {
      await createProviderGear(
        payload,
      );

      router.push(
        "/dashboard/provider",
      );
      router.refresh();
    } catch {
      setError(
        "We could not add this gear. Please check your details and try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">
        Add New Gear
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Add equipment to your inventory
        so customers can rent it.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 max-w-3xl rounded-2xl border border-border bg-card p-5 md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Gear name"
            value={form.name}
            onChange={(value) =>
              handleChange("name", value)
            }
            placeholder="e.g. Alpine touring skis"
            className="md:col-span-2"
          />

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium">
              Description
            </span>

            <textarea
              value={form.description}
              onChange={(event) =>
                handleChange(
                  "description",
                  event.target.value,
                )
              }
              placeholder="Tell customers about this item"
              rows={4}
              className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>

          <FormField
            label="Category"
            value={form.category}
            onChange={(value) =>
              handleChange(
                "category",
                value,
              )
            }
            placeholder="e.g. Winter sports"
          />

          <FormField
            label="Image URL"
            value={form.image}
            onChange={(value) =>
              handleChange(
                "image",
                value,
              )
            }
            placeholder="https://..."
            type="url"
            optional
          />

          <FormField
            label="Rental price per day"
            value={form.price}
            onChange={(value) =>
              handleChange(
                "price",
                value,
              )
            }
            placeholder="0.00"
            type="number"
            min="0.01"
            step="0.01"
          />

          <FormField
            label="Quantity"
            value={form.quantity}
            onChange={(value) =>
              handleChange(
                "quantity",
                value,
              )
            }
            type="number"
            min="1"
            step="1"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl bg-destructive/10 p-3 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {saving
              ? "Adding Gear..."
              : "Add Gear"}
          </button>
        </div>
      </form>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (
    value: string,
  ) => void;
  placeholder?: string;
  type?: string;
  min?: string;
  step?: string;
  optional?: boolean;
  className?: string;
};

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  step,
  optional = false,
  className = "",
}: FormFieldProps) {
  return (
    <label
      className={`space-y-2 ${className}`}
    >
      <span className="text-sm font-medium">
        {label}

        {optional && (
          <span className="ml-1 font-normal text-muted-foreground">
            (optional)
          </span>
        )}
      </span>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        type={type}
        min={min}
        step={step}
        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-4 focus:ring-primary/20"
      />
    </label>
  );
}