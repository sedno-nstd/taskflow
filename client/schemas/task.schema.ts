import z from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title is too long"),
  description: z.string().trim().max(500, "Description is too long").optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type CreateTaskFormValue = z.infer<typeof createTaskSchema>;
