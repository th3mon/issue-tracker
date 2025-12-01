import { z } from "zod";

export const issueSchema = z.object({
  title: z.string("Title is required.").min(1).max(255),
  description: z.string("Description is rquired.").max(65535).min(1),
});

export type IssueFormData = z.infer<typeof issueSchema>;

export const patchIssueSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(65535).optional(),
  assignedToUserId: z
    .string()
    .min(1, "assignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});

export type PatchIssueFormData = z.infer<typeof issueSchema>;
