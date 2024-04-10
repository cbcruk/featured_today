import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head></Head>
        <body className="dark:bg-gray-900 dark:text-gray-300">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
