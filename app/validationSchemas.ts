import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is rquired.").max(255),
  description: z.string("Description is rquired.").min(1),
});

export type CreateIssueSchemaType = z.infer<typeof createIssueSchema>;
