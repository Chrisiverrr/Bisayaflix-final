import Link from 'next/link'

export default function AnimeCard({ anime }) {
  return (
    <Link href={`/anime/${anime.id}`}>
      <div className="cursor-pointer hover:scale-105 transition-transform duration-200">
        <div className="relative pb-[140%] rounded-lg overflow-hidden bg-gray-800">
          <img
            src={anime.poster}
            alt={anime.title}
            className="absolute h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <h3 className="mt-2 text-sm font-semibold line-clamp-2">{anime.title}</h3>
        {anime.episodes && (
          <p className="text-xs text-gray-400 mt-1">
            {anime.episodes.sub} {anime.episodes.sub === 1 ? 'episode' : 'episodes'}
          </p>
        )}
      </div>
    </Link>
  )
  }
