import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import MainLayout from "../styles/global-layout";
import React from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <RecoilRoot>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </RecoilRoot>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
