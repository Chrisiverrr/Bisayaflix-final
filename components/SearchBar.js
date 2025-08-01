import { useRouter } from 'next/router'
import { useState } from 'react'

export default function SearchBar({ initialValue = '' }) {
  const router = useRouter()
  const [query, setQuery] = useState(initialValue)

  const handleSubmit = e => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search anime..."
          className="w-full bg-gray-700 px-4 py-3 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  )
    }
