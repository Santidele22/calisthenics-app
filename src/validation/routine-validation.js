import { z } from "zod";

const routineSchema = z.object({
  name: z.string().max(50),
  duration: z.number(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
});

function validateRoutine(input) {
  return routineSchema.safeParse(input);
}
function validatePartialRoutine(input) {
  return routineSchema.partial().safeParse(input);
}

export { validateRoutine, validatePartialRoutine };
