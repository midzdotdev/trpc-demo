import { createRouter } from "./createRouter";
import { counterRouter } from "./router/counter";
import { greetRouter } from "./router/greet";
import { timeRouter } from "./router/time";
import superjson from 'superjson';

export const appRouter = createRouter()
  .merge(greetRouter)
  .merge("time.", timeRouter)
  .merge("counter.", counterRouter)
  .transformer(superjson);

// export type definition of API
export type AppRouter = typeof appRouter;
