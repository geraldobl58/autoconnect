import { z } from "zod";

export const formAuthSchema = z.object({
  email: z.string().email({
    message: "O e-mail deve ser válido.",
  }),
  password: z
    .string()
    .min(6, {
      message: "A senha deve ter no mínimo 6 caracteres.",
    })
    .max(8, {
      message: "A senha deve ter no máximo 8 caracteres.",
    }),
});

export type FormAuthValues = z.infer<typeof formAuthSchema>;
