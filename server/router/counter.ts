import { z } from "zod";
import { createRouter } from "../createRouter";

let counterValue = 0;

export const counterRouter = createRouter()
  .query("get", {
    resolve: () => ({
      value: counterValue,
    }),
  })
  .mutation("step", {
    input: z.object({
      direction: z.union([z.literal("increment"), z.literal("decrement")]),
    }),
    resolve: ({ input: { direction } }) => {
      if (direction === "increment") {
        counterValue++;
      } else if (direction === "decrement") {
        counterValue--;
      }

      return {
        value: counterValue,
      };
    },
  });
