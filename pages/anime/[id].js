import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import EpisodeCard from '@/components/EpisodeCard'

export default function AnimeDetails() {
  const router = useRouter()
  const { id } = router.query
  const [anime, setAnime] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        setLoading(true)
        const [animeRes, episodesRes] = await Promise.all([
          fetch(`/api/v1/anime/${id}`),
          fetch(`/api/v1/episodes/${id}`)
        ])
        
        const animeData = await animeRes.json()
        const episodesData = await episodesRes.json()
        
        setAnime(animeData.data)
        setEpisodes(episodesData.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!anime) {
    return <div className="text-center py-10">Anime not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 lg:w-1/4">
          <img
            src={anime.poster}
            alt={anime.title}
            className="w-full rounded-lg"
          />
          <div className="mt-4">
            <h2 className="text-xl font-bold">Info</h2>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div>
                <p className="text-gray-400">Type:</p>
                <p>{anime.type}</p>
              </div>
              <div>
                <p className="text-gray-400">Episodes:</p>
                <p>{anime.episodes?.sub || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-400">Status:</p>
                <p>{anime.status}</p>
              </div>
              <div>
                <p className="text-gray-400">Aired:</p>
                <p>{anime.aired?.from} to {anime.aired?.to || '?'}</p>
              </div>
              <div>
                <p className="text-gray-400">Rating:</p>
                <p>{anime.rating}</p>
              </div>
              <div>
                <p className="text-gray-400">Duration:</p>
                <p>{anime.duration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
          {anime.alternativeTitle && (
            <p className="text-gray-400 mb-4">{anime.alternativeTitle}</p>
          )}

          <div className="flex flex-wrap gap-2 my-4">
            {anime.genres?.map(genre => (
              <span
                key={genre}
                className="bg-purple-600 px-3 py-1 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Synopsis</h2>
            <p className="text-gray-300 whitespace-pre-line">{anime.synopsis}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Episodes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {episodes.map(episode => (
                <EpisodeCard
                  key={episode.id}
                  animeId={id}
                  episode={episode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
