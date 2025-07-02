// src/pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Load aframe-stereo-component from CDN */}
        <script
          src="https://unpkg.com/aframe-stereo-component@1.0.0/dist/aframe-stereo-component.min.js"
          defer
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
