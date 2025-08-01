import { useState, useEffect } from 'react'
import Head from 'next/head'
import AnimeCard from '@/components/AnimeCard'

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/v1/home')
        const json = await res.json()
        setData(json.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>BisayaFlix - Watch Anime Online</title>
        <meta name="description" content="Watch anime online for free" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            <Section title="Spotlight" animeList={data?.spotlight} />
            <Section title="Trending Now" animeList={data?.trending} />
            <Section title="Top Airing" animeList={data?.topAiring} />
            <Section title="New Added" animeList={data?.newAdded} />
          </>
        )}
      </main>
    </>
  )
}

function Section({ title, animeList }) {
  if (!animeList?.length) return null

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animeList.slice(0, 12).map(anime => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  )
          }
