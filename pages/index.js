import Head from 'next/head'
import Header from '../components/Header'
import AnimeCard from '../components/AnimeCard'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

export default function Home() {
  const [trendingAnime, setTrendingAnime] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch('https://hianime-api.vercel.app/api/trending')
        const data = await res.json()
        setTrendingAnime(data.results || [])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching anime:', error)
        setLoading(false)
      }
    }
    fetchTrending()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>BisayaFlix - Watch Anime Online</title>
        <meta name="description" content="Watch anime online for free on BisayaFlix" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Trending Anime</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : trendingAnime.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {trendingAnime.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p>No anime found. API might be down.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
    }
