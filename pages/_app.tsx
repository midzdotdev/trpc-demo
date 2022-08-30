import { withTRPC } from "@trpc/next";
import { AppRouter } from "@/server";
import { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";

const MyApp: AppType = ({ Component, pageProps }) => {
  // @ts-ignore
  return <Component {...pageProps} />;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.PROD_DOMAIN
      ? `https://${process.env.PROD_DOMAIN}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      transformer: superjson,
    };
  },

  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
