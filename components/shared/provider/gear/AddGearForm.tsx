"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createProviderGear } from "@/lib/provider/api";

import type { CreateGearPayload } from "@/lib/provider/types";

type FormState = {
  photo: string;
  name: string;
  description: string;
  brand: string;
  pricePerDay: string;
  stock: string;
  categoryName: string;
  categorySlug: string;
  categoryDescription: string;
};

const initialForm: FormState = {
  photo: "",
  name: "",
  description: "",
  brand: "",
  pricePerDay: "",
  stock: "1",
  categoryName: "",
  categorySlug: "",
  categoryDescription: "",
};

export default function AddGearForm() {
  const router = useRouter();

  const [form, setForm] =
    useState<FormState>(initialForm);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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

    if (!form.photo.trim()) {
      return "Photo URL is required.";
    }

    if (!form.description.trim()) {
      return "Description is required.";
    }

    if (!form.brand.trim()) {
      return "Brand is required.";
    }

    if (
      !form.pricePerDay ||
      Number(form.pricePerDay) <= 0
    ) {
      return "Price per day must be greater than 0.";
    }

    if (
      !form.stock ||
      Number(form.stock) < 1
    ) {
      return "Stock must be at least 1.";
    }

    if (!form.categoryName.trim()) {
      return "Category name is required.";
    }

    if (!form.categorySlug.trim()) {
      return "Category slug is required.";
    }

    if (!form.categoryDescription.trim()) {
      return "Category description is required.";
    }

    return "";
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError("");

    const payload: CreateGearPayload = {
      photo: form.photo.trim(),

      name: form.name.trim(),

      description: form.description.trim(),

      brand: form.brand.trim(),

      pricePerDay: Number(form.pricePerDay),

      stock: Number(form.stock),

      isActive: true,

      category: {
        name: form.categoryName.trim(),

        slug: form.categorySlug
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-"),

        description:
          form.categoryDescription.trim(),
      },
    };

    console.log("Create Gear Payload:", payload);

    try {
      await createProviderGear(payload);

      router.push("/dashboard/provider");

      router.refresh();
    } catch (error) {
      console.error(
        "Create Gear Error:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "We could not add this gear. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}

      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Add New Gear
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Add equipment to your inventory so
          customers can rent it.
        </p>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="mt-8 max-w-4xl rounded-2xl border border-border bg-card p-5 md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {/* Gear Name */}

          <FormField
            label="Gear name"
            value={form.name}
            onChange={(value) =>
              handleChange("name", value)
            }
            placeholder="e.g. Camping Tent"
            className="md:col-span-2"
          />

          {/* Photo */}

          <FormField
            label="Photo URL"
            value={form.photo}
            onChange={(value) =>
              handleChange("photo", value)
            }
            placeholder="https://example.com/images/tent.jpg"
            type="url"
            className="md:col-span-2"
          />

          {/* Description */}

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
              placeholder="Tell customers about this gear"
              rows={4}
              className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none transition focus:ring-4 focus:ring-primary/20"
            />
          </label>

          {/* Brand */}

          <FormField
            label="Brand"
            value={form.brand}
            onChange={(value) =>
              handleChange("brand", value)
            }
            placeholder="e.g. Quechua"
          />

          {/* Price */}

          <FormField
            label="Price per day"
            value={form.pricePerDay}
            onChange={(value) =>
              handleChange(
                "pricePerDay",
                value,
              )
            }
            placeholder="20"
            type="number"
            min="0.01"
            step="0.01"
          />

          {/* Stock */}

          <FormField
            label="Stock"
            value={form.stock}
            onChange={(value) =>
              handleChange("stock", value)
            }
            placeholder="10"
            type="number"
            min="1"
            step="1"
          />

          {/* Category Name */}

          <FormField
            label="Category name"
            value={form.categoryName}
            onChange={(value) =>
              handleChange(
                "categoryName",
                value,
              )
            }
            placeholder="e.g. Camping"
          />

          {/* Category Slug */}

          <FormField
            label="Category slug"
            value={form.categorySlug}
            onChange={(value) =>
              handleChange(
                "categorySlug",
                value,
              )
            }
            placeholder="e.g. camping"
          />

          {/* Category Description */}

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium">
              Category description
            </span>

            <textarea
              value={
                form.categoryDescription
              }
              onChange={(event) =>
                handleChange(
                  "categoryDescription",
                  event.target.value,
                )
              }
              placeholder="e.g. Camping gear"
              rows={3}
              className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none transition focus:ring-4 focus:ring-primary/20"
            />
          </label>
        </div>

        {/* Error */}

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl bg-destructive/10 p-3 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        {/* Buttons */}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={saving}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
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

/* -------------------------------- */
/* Form Field                       */
/* -------------------------------- */

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  min?: string;
  step?: string;
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
  className = "",
}: FormFieldProps) {
  return (
    <label
      className={`space-y-2 ${className}`}
    >
      <span className="text-sm font-medium">
        {label}
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
        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:ring-4 focus:ring-primary/20"
      />
    </label>
  );
}