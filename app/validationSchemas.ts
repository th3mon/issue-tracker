import { z } from "zod";

export const issueSchema = z.object({
  title: z.string("Title is rquired.").min(1).max(255),
  description: z.string("Description is rquired.").min(1),
});

export type IssueFormData = z.infer<typeof issueSchema>;
