import Link from 'next/link'

export default function EpisodeCard({ animeId, episode }) {
  return (
    <Link href={`/anime/watch/${animeId}?episode=${episode.id.split('?ep=')[1]}`}>
      <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
        <p className="font-medium">{episode.title}</p>
        {episode.alternativeTitle && (
          <p className="text-xs text-gray-400 mt-1">{episode.alternativeTitle}</p>
        )}
        {episode.isFiller && (
          <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-600 text-xs rounded-full">
            Filler
          </span>
        )}
      </div>
    </Link>
  )
    }
