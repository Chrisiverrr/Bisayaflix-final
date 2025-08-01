import Link from 'next/link'

export default function AnimeCard({ anime }) {
  return (
    <Link href={`/anime/${anime.id}`}>
      <div className="cursor-pointer hover:scale-105 transition-transform duration-200">
        <div className="relative pb-[140%] rounded-lg overflow-hidden bg-gray-800">
          <img 
            src={anime.image} 
            alt={anime.title} 
            className="absolute h-full w-full object-cover"
          />
        </div>
        <h3 className="mt-2 text-sm font-semibold line-clamp-2">{anime.title}</h3>
      </div>
    </Link>
  )
              }
