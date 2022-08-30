import { z } from "zod";
import { createRouter } from "../createRouter";

export const timeRouter = createRouter().query("now", {
  output: z.object({
    now: z.date(),
  }),
  resolve: () => {
    return {
      now: new Date(),
    };
  },
});
