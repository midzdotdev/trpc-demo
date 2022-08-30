import { z } from "zod";
import { createRouter } from "../createRouter";

export const greetRouter = createRouter().query("greet", {
  input: z
    .object({
      name: z.string().nullable(),
    })
    .nullish(),
  resolve: ({ input }) => {
    return {
      greeting: `Hello ${input?.name ?? "world"}!`,
    };
  },
});
