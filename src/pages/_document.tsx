import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import MainLayout from "../components/layout/layout";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head></Head>
        <body className="font-myfont text-sm text-common-black">
          <MainLayout>
            <div id="overlay-root" />
            <Main />
          </MainLayout>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
