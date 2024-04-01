import { z } from "zod";

const exercizeSchema = z.object({
  name: z.string().max(50),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  muscle_group: z.string,
});

function validateExercize(input) {
  return exercizeSchema.safeParse(input);
}
function validatePartialExercize(input) {
  return exercizeSchema.partial().safeParse(input);
}

export { validateExercize, validatePartialExercize };
