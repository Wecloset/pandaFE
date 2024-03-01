import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import MainLayout from "../styles/global-layout";
import ModalContextProvider from "../context/modal-context";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <RecoilRoot>
          <ModalContextProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </ModalContextProvider>
        </RecoilRoot>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
