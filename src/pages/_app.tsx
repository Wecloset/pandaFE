import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import React from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <RecoilRoot>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Component {...pageProps} />
          </React.Suspense>
        </RecoilRoot>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
