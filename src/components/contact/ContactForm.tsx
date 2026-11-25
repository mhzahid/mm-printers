"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  inquirySchema,
  type Inquiry,
  type InquiryInput,
} from "@/lib/inquiry-schema";
import { inquiryTypes } from "@/data/navigation";
import { categories, categoryById } from "@/data/categories";
import type { CategoryId, Product } from "@/data/types";
import { company } from "@/data/company";
import { cn } from "@/lib/cn";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; reference: string | null }
  | {
      state: "error";
      kind: "not_configured" | "rate_limited" | "network" | "server";
      retryAfter?: number;
    };

type ProductOption = Pick<Product, "slug" | "name" | "category">;

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid content-start gap-1.5", className)}>
      <label htmlFor={id} className="text-base font-semibold">
        {label}{" "}
        {optional ? (
          <span className="font-normal text-muted">(optional)</span>
        ) : (
          <span aria-hidden="true" className="text-signal">
            *
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-[#b3261e]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({
  products,
  initial,
}: {
  products: ProductOption[];
  initial: {
    type?: string;
    product?: string;
    category?: string;
    message?: string;
  };
}) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const startedAt = useRef<number>(0);
  const statusRef = useRef<HTMLDivElement>(null);

  const initialProduct = products.find((p) => p.slug === initial.product);
  const defaultCategory = (initialProduct?.category ??
    (initial.category && initial.category in categoryById
      ? initial.category
      : "")) as CategoryId | "";

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<InquiryInput, unknown, Inquiry>({
    resolver: zodResolver(inquirySchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      message:
        initial.message ??
        (initialProduct
          ? `I'd like to know more about ${initialProduct.name}.\n\n`
          : ""),
      inquiryType: inquiryTypes.some((t) => t.value === initial.type)
        ? initial.type
        : initialProduct
          ? "product"
          : "product",
      company: "",
      phone: "",
      country: "",
      productCategory: defaultCategory,
      product: initialProduct?.slug ?? "",
      quantity: "",
      deliveryDate: "",
      website: "",
    },
  });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const selectedCategory = useWatch({ control, name: "productCategory" });
  const productOptions = useMemo(
    () =>
      selectedCategory
        ? products.filter((p) => p.category === selectedCategory)
        : products,
    [products, selectedCategory],
  );

  // If the chosen product no longer fits the chosen category, clear it.
  const selectedProduct = useWatch({ control, name: "product" });
  useEffect(() => {
    if (
      selectedProduct &&
      !productOptions.some((p) => p.slug === selectedProduct)
    )
      setValue("product", "");
  }, [productOptions, selectedProduct, setValue]);

  useEffect(() => {
    if (status.state === "success" || status.state === "error")
      statusRef.current?.focus();
  }, [status.state]);

  const onSubmit = async (data: Inquiry) => {
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        reference?: string | null;
        retryAfter?: number;
        fieldErrors?: Record<string, string>;
      };
      if (res.ok && json.ok) {
        setStatus({ state: "success", reference: json.reference ?? null });
        reset();
        return;
      }
      if (res.status === 422 && json.fieldErrors) {
        const keys = Object.keys(json.fieldErrors) as (keyof InquiryInput)[];
        keys.forEach((k) => setError(k, { message: json.fieldErrors![k] }));
        if (keys[0]) setFocus(keys[0]);
        setStatus({ state: "idle" });
        return;
      }
      if (res.status === 429)
        return setStatus({
          state: "error",
          kind: "rate_limited",
          retryAfter: json.retryAfter,
        });
      if (res.status === 503)
        return setStatus({ state: "error", kind: "not_configured" });
      setStatus({ state: "error", kind: "server" });
    } catch {
      setStatus({ state: "error", kind: "network" });
    }
  };

  const aria = (name: keyof InquiryInput, hint = false) => ({
    id: `f-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby":
      [errors[name] ? `f-${name}-error` : "", hint ? `f-${name}-hint` : ""]
        .filter(Boolean)
        .join(" ") || undefined,
  });

  if (status.state === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="trim-card p-8 outline-none md:p-12"
      >
        <CheckCircle2 className="size-10 text-signal" aria-hidden="true" />
        <h2 className="display-md mt-6">Inquiry sent.</h2>
        <p className="lede mt-4 text-muted">
          Thank you. Your inquiry has reached MM Printers and we&rsquo;ll reply
          to the email address you gave us.
          {status.reference ? ` Your reference is ${status.reference}.` : ""}
        </p>
        <button
          type="button"
          className="btn btn-ghost mt-8"
          onClick={() => setStatus({ state: "idle" })}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form
      onSubmit={(e) => handleSubmit(onSubmit)(e)}
      noValidate
      className="grid gap-6"
      aria-describedby="form-note"
    >
      <p id="form-note" className="text-sm text-muted">
        Fields marked <span className="text-signal">*</span> are required. Share
        only what you know — we&rsquo;ll ask about the rest.
      </p>

      <fieldset className="grid gap-3">
        <legend className="mb-3 text-base font-semibold">
          What is your inquiry about?
        </legend>
        <div className="flex flex-wrap gap-2">
          {inquiryTypes.map((t) => (
            <label key={t.value} className="cursor-pointer">
              <input
                type="radio"
                value={t.value}
                {...register("inquiryType")}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-11 items-center rounded-full border border-ink/25 px-4 text-base transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal hover:bg-stone peer-checked:hover:bg-ink">
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="f-name" label="Full name" error={errors.name?.message}>
          <input
            {...register("name")}
            {...aria("name")}
            autoComplete="name"
            className="field"
          />
        </Field>
        <Field
          id="f-email"
          label="Business email"
          error={errors.email?.message}
        >
          <input
            {...register("email")}
            {...aria("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            className="field"
          />
        </Field>
        <Field
          id="f-company"
          label="Company"
          optional
          error={errors.company?.message}
        >
          <input
            {...register("company")}
            {...aria("company")}
            autoComplete="organization"
            className="field"
          />
        </Field>
        <Field
          id="f-phone"
          label="Phone"
          optional
          error={errors.phone?.message}
        >
          <input
            {...register("phone")}
            {...aria("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className="field"
          />
        </Field>
        <Field
          id="f-country"
          label="Country or region"
          optional
          error={errors.country?.message}
          className="sm:col-span-2"
        >
          <input
            {...register("country")}
            {...aria("country")}
            autoComplete="country-name"
            className="field"
          />
        </Field>
      </div>

      <div className="grid gap-6 rounded-md bg-stone/70 p-5 sm:grid-cols-2 md:p-6">
        <Field
          id="f-productCategory"
          label="Product category"
          optional
          error={errors.productCategory?.message}
        >
          <select
            {...register("productCategory")}
            {...aria("productCategory")}
            className="field"
          >
            <option value="">Any / not sure</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="f-product"
          label="Specific product"
          optional
          error={errors.product?.message}
        >
          <select
            {...register("product")}
            {...aria("product")}
            className="field"
          >
            <option value="">Not sure yet</option>
            {productOptions.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="f-quantity"
          label="Estimated quantity"
          optional
          hint="If you know it, e.g. 20,000 pcs."
          error={errors.quantity?.message}
        >
          <input
            {...register("quantity")}
            {...aria("quantity", true)}
            className="field"
          />
        </Field>
        <Field
          id="f-deliveryDate"
          label="Desired delivery date"
          optional
          error={errors.deliveryDate?.message}
        >
          <input
            {...register("deliveryDate")}
            {...aria("deliveryDate")}
            type="date"
            className="field"
          />
        </Field>
      </div>

      <Field
        id="f-message"
        label="Your message"
        hint="Describe the product, artwork or specification. Reference files can be emailed to us after you send this."
        error={errors.message?.message}
      >
        <textarea
          {...register("message")}
          {...aria("message", true)}
          rows={6}
          className="field resize-y"
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="f-website">Leave this field empty</label>
        <input
          id="f-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {status.state === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-md border-[1.5px] border-[#b3261e] bg-[#fdf3f2] p-5 text-base outline-none"
        >
          {status.kind === "not_configured" && (
            <p>
              <strong>
                Online inquiries aren&rsquo;t available right now, and your
                message was not sent.
              </strong>{" "}
              Please email{" "}
              <a
                className="link-underline font-medium"
                href={`mailto:${company.email}`}
              >
                {company.email}
              </a>{" "}
              or call{" "}
              <a
                className="link-underline font-medium"
                href={`tel:${company.phone}`}
              >
                {company.phoneDisplay}
              </a>
              .
            </p>
          )}
          {status.kind === "rate_limited" && (
            <p>
              <strong>Too many inquiries from this connection.</strong> Your
              message was not sent. Try again in{" "}
              {Math.max(1, Math.ceil((status.retryAfter ?? 600) / 60))} minutes,
              or email {company.email}.
            </p>
          )}
          {(status.kind === "server" || status.kind === "network") && (
            <p>
              <strong>Your inquiry could not be sent.</strong>{" "}
              {status.kind === "network"
                ? "Check your internet connection and"
                : "Please"}{" "}
              try again. Your details are still in the form. If it keeps
              failing, email {company.email}.
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn btn-primary min-w-48"
          disabled={submitting}
          aria-disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />{" "}
              Sending inquiry…
            </>
          ) : status.state === "error" ? (
            "Try sending again"
          ) : (
            "Send inquiry"
          )}
        </button>
        <p className="text-sm text-muted">
          We use your details only to reply to this inquiry.
        </p>
      </div>
    </form>
  );
}
