import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import VideoPlayer from '@/components/VideoPlayer'

export default function WatchPage() {
  const router = useRouter()
  const { id } = router.query
  const { episode } = router.query
  const [streamData, setStreamData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedServer, setSelectedServer] = useState('HD-2')
  const [selectedType, setSelectedType] = useState('sub')

  useEffect(() => {
    if (!id || !episode) return

    const fetchStreamData = async () => {
      try {
        setLoading(true)
        // First get available servers
        const serversRes = await fetch(
          `/api/v1/episode/servers?id=${id}::ep=${episode}`
        )
        const serversData = await serversRes.json()

        // Then get stream for default server
        const streamRes = await fetch(
          `/api/v1/stream?server=${selectedServer}&type=${selectedType}&id=${id}::ep=${episode}`
        )
        const streamData = await streamRes.json()

        setStreamData({
          servers: serversData.data,
          stream: streamData.data
        })
        setLoading(false)
      } catch (error) {
        console.error('Error fetching stream data:', error)
        setLoading(false)
      }
    }

    fetchStreamData()
  }, [id, episode, selectedServer, selectedType])

  const handleServerChange = (server, type) => {
    setSelectedServer(server)
    setSelectedType(type)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!streamData) {
    return <div className="text-center py-10">Stream not available</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <VideoPlayer streamData={streamData.stream} />
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Available Servers</h2>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">Subtitles</h3>
          <div className="flex flex-wrap gap-2">
            {streamData.servers.sub.map(server => (
              <button
                key={server.id}
                onClick={() => handleServerChange(server.name, 'sub')}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedServer === server.name && selectedType === 'sub'
                    ? 'bg-purple-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {server.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Dubbed</h3>
          <div className="flex flex-wrap gap-2">
            {streamData.servers.dub.map(server => (
              <button
                key={server.id}
                onClick={() => handleServerChange(server.name, 'dub')}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedServer === server.name && selectedType === 'dub'
                    ? 'bg-purple-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {server.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
