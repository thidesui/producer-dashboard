import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// Test change on hosting
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
