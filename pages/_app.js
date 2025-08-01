import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
