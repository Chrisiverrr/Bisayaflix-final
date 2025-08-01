import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function AnimeDetails() {
  const router = useRouter()
  const { id } = router.query
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    
    const fetchAnime = async () => {
      try {
        const res = await fetch(`https://hianime-api.vercel.app/api/info?id=${id}`)
        const data = await res.json()
        setAnime(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching anime details:', error)
        setLoading(false)
      }
    }
    
    fetchAnime()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <p>Anime not found. The API might be down.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 lg:w-1/4">
            <img 
              src={anime.image} 
              alt={anime.title} 
              className="w-full rounded-lg"
            />
          </div>
          
          <div className="md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
            
            <div className="flex flex-wrap gap-2 my-4">
              {anime.genres?.map(genre => (
                <span key={genre} className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
            
            <p className="text-gray-300 mb-6">{anime.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {anime.episodes?.slice(0, 12).map(episode => (
                <a 
                  key={episode.id} 
                  href={`/anime/watch/${episode.id}`}
                  className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Episode {episode.number}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
      }
