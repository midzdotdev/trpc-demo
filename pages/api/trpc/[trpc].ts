import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/server";

// handles all tRPC requests
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
