import { z } from "zod";
import { inquiryTypes } from "@/data/navigation";
import { categories } from "@/data/categories";

const inquiryValues = inquiryTypes.map((t) => t.value) as [string, ...string[]];
const categoryValues = categories.map((c) => c.id) as [string, ...string[]];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters.`)
    .optional()
    .or(z.literal(""));

/** Shared by the client form and the API route, so validation is identical on both sides. */
export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120, "Keep your name under 120 characters."),
  email: z.string().trim().min(1, "Enter your business email.").email("Enter a valid email address, like name@company.com.").max(160),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(5000, "Keep your message under 5,000 characters."),
  inquiryType: z.enum(inquiryValues).default("product"),
  company: optionalText(160),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+()\d\s.-]*$/, "Use digits, spaces and + ( ) - only.")
    .optional()
    .or(z.literal("")),
  country: optionalText(80),
  productCategory: z.enum(categoryValues).optional().or(z.literal("")),
  product: optionalText(120),
  quantity: optionalText(80),
  deliveryDate: z
    .string()
    .trim()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "Use a valid date.")
    .optional()
    .or(z.literal("")),
  // Anti-spam fields (not shown to people)
  website: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
  startedAt: z.number().int().optional(),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;
