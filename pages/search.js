import { useState } from 'react'
import { useRouter } from 'next/router'
import AnimeCard from '@/components/AnimeCard'
import SearchBar from '@/components/SearchBar'

export default function SearchPage() {
  const router = useRouter()
  const { keyword } = router.query
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (!keyword) return

    const fetchResults = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/v1/search?keyword=${keyword}&page=${page}`)
        const data = await res.json()
        setResults(data.data.response)
        setTotalPages(data.data.pageInfo.totalPages)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching search results:', error)
        setLoading(false)
      }
    }

    fetchResults()
  }, [keyword, page])

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar initialValue={keyword} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">
            Search Results for "{keyword}"
          </h1>

          {results.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {results.map(anime => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-4 py-2 rounded ${
                        page === p ? 'bg-purple-600' : 'bg-gray-700'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-center py-10">No results found</p>
          )}
        </>
      )}
    </div>
  )
}
